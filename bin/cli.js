#!/usr/bin/env node
import { main } from '../src/main.js'

const result = await main()
console.log(result.bucketsYear['2016'])
