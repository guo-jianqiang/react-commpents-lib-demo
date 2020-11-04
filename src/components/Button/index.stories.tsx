import React from 'react';
import Button from './index';

export default {
    title: 'Button',
    component: Button
};

export const ButtonTypes = () => (
    <div className='storybook__container button'>
        <Button>test</Button>
    </div>
);

export const ButtonType = () => (
    <div className='storybook__container button'>
        <Button>test</Button>
        <Button>test1</Button>
        <Button>test2</Button>
        <Button>test3</Button>
    </div>
);