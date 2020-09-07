import React, {Fragment} from 'react';
import styled from 'styled-components';

import {Container} from 'components/Layout';
import Skeleton from 'components/Skeleton';
import {Loading} from 'components/Loading';
import Empty from 'components/Empty';
import InfiniteScroll from 'components/InfiniteScroll';
import Head from 'components/Head';
import LearnerCard from './LearnerCard';

import {GET_POTENTIAL_PARTNERS} from 'graphql/user';

import {LEARNER_PAGE_USERS_LIMIT} from 'constants/DataLimit';

import {useStore} from 'store';

import {Query} from 'react-apollo';

const Root = styled(Container)`
  margin-top: ${p => p.theme.spacing.lg};

  @media (min-width: ${p => p.theme.screen.lg}) {
    margin-left: ${p => p.theme.spacing.lg};
    padding: 0;
  }
`;

const LearnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
  margin-bottom: ${p => p.theme.spacing.lg};
`;

/**
 * Learners page
 */
const Learners = () => {
    const [{auth}] = useStore();
    const variables = {
        userId: auth.user.id,
        skip: 0,
        limit: LEARNER_PAGE_USERS_LIMIT,
    };

    return (
        <Root maxWidth="md">
            <Head title="Find language partners"/>

            <Query
                query={GET_POTENTIAL_PARTNERS}
                variables={variables}
                notifyOnNetworkStatusChange
            >
                {({data, loading, fetchMore, networkStatus}) => {
                    if (loading && networkStatus === 1) {
                        return (
                            <LearnerContainer>
                                <Skeleton height={280} count={LEARNER_PAGE_USERS_LIMIT}/>
                            </LearnerContainer>
                        );
                    }

                    const {users, count} = data.getPotentialPartners;

                    if (!users.length > 0) return <Empty text="No learners yet."/>;

                    return (
                        <InfiniteScroll
                            data={users}
                            dataKey="getPotentialPartners.users"
                            count={parseInt(count)}
                            variables={variables}
                            fetchMore={fetchMore}
                        >
                            {data => {
                                const showNextLoading =
                                    loading && networkStatus === 3 && count !== data.length;

                                return (
                                    <Fragment>
                                        <LearnerContainer>
                                            {data.map(user => (
                                                <LearnerCard key={user.id} user={user}/>
                                            ))}
                                        </LearnerContainer>

                                        {showNextLoading && <Loading top="lg"/>}
                                    </Fragment>
                                );
                            }}
                        </InfiniteScroll>
                    );
                }}
            </Query>
        </Root>
    );
};

export default Learners;