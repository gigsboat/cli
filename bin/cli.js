#!/usr/bin/env node
import { generateGigs } from '../src/main.js'

const result = await generateGigs()
console.log(result)
