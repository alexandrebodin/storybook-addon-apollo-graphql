import { storiesOf } from '@storybook/react';
import React from 'react';
import randomStories from './random';
import messageStories from './message';
import mutationStories from './mutation';
import variablesStories from './variables';
import autoMock from './autoMock';
import withOptions from './withOptions';

randomStories();
messageStories();
mutationStories();
variablesStories();
autoMock();
withOptions();
