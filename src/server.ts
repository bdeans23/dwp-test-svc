#!/usr/bin/env node

import app from './app';
import config from './config';

const configuration = config(process.env);
app(configuration);
