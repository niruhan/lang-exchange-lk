import React, {useState, Fragment} from 'react';
import styled from 'styled-components';
import {generatePath} from 'react-router-dom';
import {Query} from 'react-apollo';

import {Container, Spacing} from 'components/Layout';
import Skeleton from 'components/Skeleton';
import PostCard from 'components/PostCard';
import PostPopup from 'components/PostPopup';
import Modal from 'components/Modal';
import InfiniteScroll from 'components/InfiniteScroll';
import Empty from 'components/Empty';
import {Loading} from 'components/Loading';
import Head from 'components/Head';

import {GET_FORUM_POSTS} from 'graphql/post';

import {EXPLORE_PAGE_POSTS_LIMIT} from 'constants/DataLimit';

import {useStore} from 'store';

import * as Routes from 'routes';

const Root = styled(Container)`
  margin-top: ${p => p.theme.spacing.lg};
  margin-bottom: ${p => p.theme.spacing.sm};

  @media (min-width: ${p => p.theme.screen.lg}) {
    margin-left: ${p => p.theme.spacing.lg};
    padding: 0;
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
`;

/**
 * LangForum page
 */
const LangForum = () => {
    const [{auth}] = useStore();

    const [modalPostId, setModalPostId] = useState(null);

    const closeModal = () => {
        window.history.pushState('', '', '/langforum');
        setModalPostId(null);
    };

    const openModal = postId => {
        window.history.pushState('', '', generatePath(Routes.POST, {id: postId}));
        setModalPostId(postId);
    };

    const variables = {
        authUserId: auth.user.id,
        targetLanguage: auth.user.targetLanguage,
        skip: 0,
        limit: EXPLORE_PAGE_POSTS_LIMIT,
    };

    return (
        <Root maxWidth="md">
            <Head title="Explore New Posts and Learners"/>
            {/* {console.log(auth)} */}

            <Query
                query={GET_FORUM_POSTS}
                variables={variables}
                notifyOnNetworkStatusChange
            >
                {({data, loading, fetchMore, networkStatus}) => {
                    if (loading && networkStatus === 1) {
                        return (
                            <PostsContainer>
                                <Skeleton height={300} count={EXPLORE_PAGE_POSTS_LIMIT}/>
                            </PostsContainer>
                        );
                    }
                    {console.log(data)}
                    const {posts, count} = data.getForumPosts;

                    if (!posts.length > 0) return <Empty text="No posts yet."/>;

                    return (
                        <InfiniteScroll
                            data={posts}
                            dataKey="getPosts.posts"
                            count={parseInt(count)}
                            variables={variables}
                            fetchMore={fetchMore}
                        >
                            {data => {
                                const showNextLoading =
                                    loading && networkStatus === 3 && count !== data.length;

                                return (
                                    <Fragment>
                                        {data.map(post => (
                                            <Fragment key={post.id}>
                                                <Modal
                                                    open={modalPostId === post.id}
                                                    onClose={closeModal}
                                                >
                                                    <PostPopup id={post.id} closeModal={closeModal}/>
                                                </Modal>

                                                <Spacing bottom="lg" top="lg">
                                                    <PostCard
                                                        author={post.author}
                                                        imagePublicId={post.imagePublicId}
                                                        postId={post.id}
                                                        comments={post.comments}
                                                        createdAt={post.createdAt}
                                                        title={post.title}
                                                        image={post.image}
                                                        likes={post.likes}
                                                        openModal={() => openModal(post.id)}
                                                    />
                                                </Spacing>
                                            </Fragment>
                                        ))}

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

export default LangForum;
