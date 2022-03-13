import {describe, expect, it} from 'vitest'
import { computeBullCowCount, getRandomWord } from './words'



describe("random word", () => {
    it("has a truthy value", () => {
        expect(getRandomWord()).toBeTruthy()
    })

    it("has correct length", () => {
        expect(getRandomWord()).toHaveLength(5)
        expect(getRandomWord(5)).toHaveLength(5)
        expect(getRandomWord(1)).toHaveLength(0)
    })
})

describe("computes correct bulls and cows", () => {
    it("should have 1 bull and 1 cow", () => {
        expect(computeBullCowCount("cigar", "ifqor")).toEqual({bulls: 1, cows: 1})
    })

    it("should have 3 bull and 0 cow", () => {
        expect(computeBullCowCount("cigar", "sugar")).toEqual({bulls: 3, cows: 0})
    })

    it("should have 5 bull and 0 cow", () => {
        expect(computeBullCowCount("cigar", "cigar")).toEqual({bulls: 5, cows: 0})
    })

    it("should have 0 bull and 0 cow", () => {
        expect(computeBullCowCount("lllll", "ifqor")).toEqual({bulls: 0, cows: 0})
    })

    it("should have 0 bull and 5 cow", () => {
        expect(computeBullCowCount("cigar", "icarg")).toEqual({bulls: 0, cows: 5})
    })
})