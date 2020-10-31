import {uploadToCloudinary, deleteFromCloudinary} from '../utils/cloudinary';

import User from '../models/User';
import Post from '../models/Post';
import Like from '../models/Like';
import Follow from '../models/Follow';
import Comment from '../models/Comment';
import Notification from '../models/Notification';

const Query = {
    /**
     * Gets all posts of people learning the same language
     *
     * @param {string} authUserId
     * @param {string} targetLanguage
     * @param {int} skip how many posts to skip
     * @param {int} limit how many posts to limit
     */
    getForumPosts: async (_, {authUserId, targetLanguage, skip, limit}) => {
        const query = {
            $and: [{authorTargetLanguage: targetLanguage}, {isForumPost: true}],
        };
        const postsCount = await Post.find(query).countDocuments();
        const allPosts = await Post.find(query)
            .populate({
                path: 'author',
                populate: [
                    {path: 'following'},
                    {path: 'followers'},
                    {
                        path: 'notifications',
                        populate: [
                            {path: 'author'},
                            {path: 'follow'},
                            {path: 'like'},
                            {path: 'comment'},
                        ],
                    },
                ],
            })
            .populate('likes')
            .populate({
                path: 'comments',
                options: {sort: {createdAt: 'desc'}},
                populate: {path: 'author'},
            })
            .skip(skip)
            .limit(limit)
            .sort({createdAt: 'desc'});

        return {posts: allPosts, count: postsCount};
    },
    /**
     * Gets all posts of potential language partners
     *
     * @param {string} authUserId
     * @param {string} nativeLanguage
     * @param {string} targetLanguage
     * @param {int} skip how many posts to skip
     * @param {int} limit how many posts to limit
     */
    getExplorePosts: async (_, {authUserId, nativeLanguage, targetLanguage, skip, limit}) => {
        const query = {
            $and: [{author: {$ne: authUserId}, authorNativeLanguage: targetLanguage, authorTargetLanguage: nativeLanguage}],
        };
        const postsCount = await Post.find(query).countDocuments();
        const allPosts = await Post.find(query)
            .populate({
                path: 'author',
                populate: [
                    {path: 'following'},
                    {path: 'followers'},
                    {
                        path: 'notifications',
                        populate: [
                            {path: 'author'},
                            {path: 'follow'},
                            {path: 'like'},
                            {path: 'comment'},
                        ],
                    },
                ],
            })
            .populate('likes')
            .populate({
                path: 'comments',
                options: {sort: {createdAt: 'desc'}},
                populate: {path: 'author'},
            })
            .skip(skip)
            .limit(limit)
            .sort({createdAt: 'desc'});

        return {posts: allPosts, count: postsCount};
    },
    /**
     * Gets posts from followed users
     *
     * @param {string} userId
     * @param {int} skip how many posts to skip
     * @param {int} limit how many posts to limit
     */
    getFollowedPosts: async (_, {userId, skip, limit}) => {
        // Find user ids, that current user follows
        const userFollowing = [];
        const follow = await Follow.find({follower: userId}, {_id: 0}).select(
            'user'
        );
        follow.map(f => userFollowing.push(f.user));

        // Find user posts and followed posts by using userFollowing ids array
        const query = {
            $or: [{author: {$in: userFollowing}}, {author: userId}],
        };
        const followedPostsCount = await Post.find(query).countDocuments();
        const followedPosts = await Post.find(query)
            .populate({
                path: 'author',
                populate: [
                    {path: 'following'},
                    {path: 'followers'},
                    {
                        path: 'notifications',
                        populate: [
                            {path: 'author'},
                            {path: 'follow'},
                            {path: 'like'},
                            {path: 'comment'},
                        ],
                    },
                ],
            })
            .populate('likes')
            .populate({
                path: 'comments',
                options: {sort: {createdAt: 'desc'}},
                populate: {path: 'author'},
            })
            .skip(skip)
            .limit(limit)
            .sort({createdAt: 'desc'});

        return {posts: followedPosts, count: followedPostsCount};
    },
    /**
     * Gets post by id
     *
     * @param {string} id
     */
    getPost: async (_, {id}) => {
        const post = await Post.findById(id)
            .populate({
                path: 'author',
                populate: [
                    {path: 'following'},
                    {path: 'followers'},
                    {
                        path: 'notifications',
                        populate: [
                            {path: 'author'},
                            {path: 'follow'},
                            {path: 'like'},
                            {path: 'comment'},
                        ],
                    },
                ],
            })
            .populate('likes')
            .populate({
                path: 'comments',
                options: {sort: {createdAt: -1}},
                populate: {path: 'author'},
            });
        return post;
    },
};

const Mutation = {
    /**
     * Creates a new post
     *
     * @param {string} title
     * @param {string} image
     * @param {string} authorId
     */
    createPost: async (_, {input: {title, image, authorId, authorNativeLanguage, authorTargetLanguage, isForumPost}}) => {
        if (!title && !image) {
            throw new Error('Post title or image is required.');
        }

        let imageUrl, imagePublicId;
        if (image) {
            const {createReadStream} = await image;
            const stream = createReadStream();
            const uploadImage = await uploadToCloudinary(stream, 'post');

            if (!uploadImage.secure_url) {
                throw new Error(
                    'Something went wrong while uploading image to Cloudinary'
                );
            }

            imageUrl = uploadImage.secure_url;
            imagePublicId = uploadImage.public_id;
        }

        const newPost = await new Post({
            title,
            image: imageUrl,
            imagePublicId,
            author: authorId,
            authorNativeLanguage: authorNativeLanguage,
            authorTargetLanguage: authorTargetLanguage,
            isForumPost: isForumPost
        }).save();

        await User.findOneAndUpdate(
            {_id: authorId},
            {$push: {posts: newPost.id}}
        );

        return newPost;
    },
    /**
     * Deletes a user post
     *
     * @param {string} id
     * @param {imagePublicId} id
     */
    deletePost: async (_, {input: {id, imagePublicId}}) => {
        // Remove post image from cloudinary, if imagePublicId is present
        if (imagePublicId) {
            const deleteImage = await deleteFromCloudinary(imagePublicId);

            if (deleteImage.result !== 'ok') {
                throw new Error(
                    'Something went wrong while deleting image from Cloudinary'
                );
            }
        }

        // Find post and remove it
        const post = await Post.findByIdAndRemove(id);

        // Delete post from authors (users) posts collection
        await User.findOneAndUpdate(
            {_id: post.author},
            {$pull: {posts: post.id}}
        );

        // Delete post likes from likes collection
        await Like.find({post: post.id}).deleteMany();
        // Delete post likes from users collection
        post.likes.map(async likeId => {
            await User.where({likes: likeId}).update({$pull: {likes: likeId}});
        });

        // Delete post comments from comments collection
        await Comment.find({post: post.id}).deleteMany();
        // Delete comments from users collection
        post.comments.map(async commentId => {
            await User.where({comments: commentId}).update({
                $pull: {comments: commentId},
            });
        });

        // Find user notification in users collection and remove them
        const userNotifications = await Notification.find({post: post.id});

        userNotifications.map(async notification => {
            await User.where({notifications: notification.id}).update({
                $pull: {notifications: notification.id},
            });
        });
        // Remove notifications from notifications collection
        await Notification.find({post: post.id}).deleteMany();

        return post;
    },
};

export default {Query, Mutation};
