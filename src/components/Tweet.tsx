import React from 'react';
import { motion } from 'framer-motion';

interface TweetProps {
    username: string;
    handle: string;
    content: string;
    avatar: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
}

const Tweet: React.FC<TweetProps> = ({
    username,
    handle,
    content,
    avatar,
    timestamp,
    likes,
    retweets,
    replies
}) => {
    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 max-w-xl mx-auto my-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-start">
                <img src={avatar} alt={username} className="w-12 h-12 rounded-full mr-3" />
                <div className="flex-1">
                    <div className="flex items-center mb-1">
                        <h3 className="font-bold text-black dark:text-white">{username}</h3>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">@{handle}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">·</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">{timestamp}</span>
                    </div>
                    <p className="text-black dark:text-white mb-3">{content}</p>
                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                        <motion.button
                            className="flex items-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {replies}
                        </motion.button>
                        <motion.button
                            className="flex items-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {retweets}
                        </motion.button>
                        <motion.button
                            className="flex items-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {likes}
                        </motion.button>
                        <motion.button
                            className="flex items-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Tweet;