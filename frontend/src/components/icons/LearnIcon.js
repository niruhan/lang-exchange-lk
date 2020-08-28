import React from 'react';
import theme from 'theme';

/**
 * Speak icon
 *
 * @param {string} width
 * @param {string} color
 */
export const LearnIcon = ({width, color}) => {
    const DEFAULT_WIDTH = '30';
    const DEFAULT_COLOR = theme.colors.text.secondary;

    return (
        <svg
            viewBox="0 0 512.055 512.055"
            width={width || DEFAULT_WIDTH}
            xmlns="http://www.w3.org/2000/svg"
            fill={theme.colors[color] || DEFAULT_COLOR}
        >
            <g>
                <path
                    d="m478.683 342.081 25.104-36.729c13.003-19.025 10.445-44.491-6.081-60.551l-47.641-46.297v-81.661c0-8.884-7.228-16.112-16.111-16.112h-15.011v-15.998c0-6.958-5.66-12.618-12.618-12.618h-109.495c-17.15 0-32.23 8.992-40.803 22.5-8.573-13.509-23.653-22.5-40.803-22.5h-31.858c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h31.858c18.363 0 33.303 14.939 33.303 33.303v141.692c0 6.512-5.297 11.809-11.809 11.809h-121.87l11.222-21.693c4.084-7.897 2.556-17.378-3.803-23.591-3.812-3.725-8.83-5.747-14.154-5.711v-135.81h45.266c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-47.648c-6.957 0-12.617 5.66-12.617 12.618v15.998h-15.011c-8.885 0-16.112 7.228-16.112 16.112v81.661l-47.64 46.297c-16.527 16.06-19.084 41.526-6.081 60.553l25.104 36.729c2.168 3.173 3.314 6.882 3.314 10.726v20.475h-5.703c-7.568 0-13.727 6.157-13.727 13.727v39.206c0 7.569 6.158 13.728 13.727 13.728h14.755c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-13.482v-36.66h75.224v36.66h-31.754c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h33.027c7.569 0 13.727-6.158 13.727-13.728v-39.206c0-7.569-6.157-13.727-13.727-13.727h-2.746l.476-22.887c.083-3.57.722-7.091 1.9-10.465 2.085-5.972 2.759-12.276 2.11-18.426h113.038c.982 0 .682.564 2.565 4.659 2.179 6.536 8.198 10.894 15.129 10.894h29.603c6.932 0 12.95-4.357 15.128-10.894 1.898-4.126 1.591-4.659 2.566-4.659h113.036c-.65 6.15.025 12.454 2.111 18.426 1.179 3.374 1.817 6.895 1.9 10.446l.475 22.905h-2.746c-7.568 0-13.727 6.157-13.727 13.727v39.206c0 7.569 6.158 13.728 13.727 13.728h24.271c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-22.997v-36.66h75.224v36.66h-22.239c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h23.513c7.569 0 13.727-6.158 13.727-13.728v-39.206c0-7.569-6.157-13.727-13.727-13.727h-5.704v-20.475c-.001-3.844 1.146-7.553 3.315-10.726zm-44.73-226.351c.613 0 1.111.499 1.111 1.112v129.665l-16.122-16.761v-114.016zm-137.123-28.616h107.112v135.811c-5.299-.014-10.342 1.986-14.153 5.709-6.36 6.214-7.889 15.696-3.803 23.593l11.221 21.692h-121.87c-6.512 0-11.81-5.297-11.81-11.809v-141.693c0-18.363 14.94-33.303 33.303-33.303zm-218.727 28.616h15.011v114.016l-16.124 16.762v-129.666c0-.613.499-1.112 1.113-1.112zm-26.415 257.551v-20.475c0-6.877-2.051-13.514-5.931-19.19l-25.103-36.728c-8.876-12.987-7.131-30.369 4.149-41.332l37.187-36.139v42.684l-14.424 14.995c-2.871 2.985-2.779 7.733.206 10.604 2.986 2.872 7.732 2.779 10.604-.206l46.19-48.02c1.967-2.045 5.209-2.075 7.216-.112 1.61 1.573 1.997 3.973.964 5.972l-24.729 47.802c-2.686 4.954-2.112 10.95 1.476 15.31 6.062 7.363 7.874 17.532 4.729 26.537-1.695 4.855-2.615 9.923-2.734 15.081l-.482 23.216h-39.318zm236.835-66.777c-6.932 0-12.95 4.357-15.128 10.894-1.901 4.118-1.59 4.659-2.566 4.659h-29.603c-.981 0-.683-.565-2.566-4.658-2.177-6.537-8.195-10.895-15.128-10.895h-117.49c-1.246-2.44-2.729-4.773-4.453-6.953l5.5-10.631h129.63c7.579 0 14.428-3.166 19.309-8.24 4.881 5.073 11.73 8.24 19.31 8.24h129.63l5.499 10.631c-1.724 2.18-3.207 4.513-4.453 6.953zm132.526 66.777-.482-23.234c-.119-5.14-1.039-10.207-2.734-15.062-3.146-9.004-1.333-19.173 4.729-26.538 3.588-4.358 4.161-10.354 1.476-15.309l-24.729-47.802c-1.034-1.999-.647-4.398.964-5.972 2.005-1.96 5.246-1.936 7.216.112l46.19 48.02c2.872 2.986 7.62 3.079 10.604.206 2.985-2.871 3.077-7.619.206-10.604l-14.425-14.996v-42.683l37.188 36.139c11.28 10.962 13.025 28.345 4.149 41.331l-25.103 36.729c-3.881 5.677-5.932 12.313-5.932 19.19v20.475h-39.317z"/>
                <path
                    d="m295.417 130.304h71.636c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-71.636c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5z"/>
                <path
                    d="m295.417 168.779h71.636c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-71.636c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5z"/>
                <path
                    d="m295.417 207.255h71.636c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-71.636c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5z"/>
                <path
                    d="m295.417 245.73h71.636c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-71.636c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5z"/>
                <path
                    d="m216.638 115.304h-71.635c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h71.635c4.143 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/>
                <path
                    d="m216.638 153.779h-71.635c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h71.635c4.143 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/>
                <path
                    d="m216.638 192.255h-71.635c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h71.635c4.143 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/>
                <path
                    d="m216.638 230.73h-71.635c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h71.635c4.143 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5z"/>
            </g>
        </svg>
    );
};
