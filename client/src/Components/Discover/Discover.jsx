import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useGetUsers} from '../../Services/userService';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import {grey} from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import Header from "../Layout/Header";

const useStyles = makeStyles(theme => ({
    list: {
        maxHeight: '80vh',
        overflowY: 'auto',
        margin: '10px 0px'
    },
    avatar: {
        margin: theme.spacing(0, 3, 0, 1),
    },
    name: {
        fontSize: 20,
        textTransform: 'capitalize',
    },
    subtitle: {
        fontSize: 12,
        textTransform: 'capitalize',
        color: grey["500"],
    },
}));

const Discover = props => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const getUsers = useGetUsers();

    useEffect(() => {
        getUsers().then(res => setUsers(res));
    }, []);

    useEffect(() => {
        console.log(users);
    });

    return (
        <React.Fragment>
            <Header/>
            {/*<h3>Welcome to Discover Page</h3>*/}
            {/*<Divider inset={true} />*/}
            {/*<Link to="/chat">chat</Link>*/}
            <List className={classes.list}>
                {users && (
                    <React.Fragment>
                        {users.map(u => (
                            <React.Fragment>
                                <ListItem
                                    className={classes.listItem}
                                    key={u._id}
                                    onClick={() => {
                                        // props.setUser(u);
                                        // props.setScope(u.name);
                                    }}
                                    button
                                >
                                    <ListItemAvatar className={classes.avatar}>
                                        <Avatar>AD</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<NameDetails {...u} />}
                                        secondary={u.description}
                                        secondaryTextLines={1}
                                    />
                                </ListItem>
                                <Divider inset={true} />
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                )}
            </List>
        </React.Fragment>
    )
};

const NameDetails = ({name, description, nativeLanguage, targetLanguage}) => {
    const classes = useStyles();
    return (
        <div>
            <div>
                <span className={classes.name}>
                  {name}
                </span>
            </div>
            <div className={classes.subtitle}>
                <span>
                    {`Speaks ${nativeLanguage}`}
                </span>{' | '}
                <span>
                    {`Learning ${targetLanguage}`}
                </span>
            </div>
        </div>
    );
};

Discover.propTypes = {};

export default Discover
