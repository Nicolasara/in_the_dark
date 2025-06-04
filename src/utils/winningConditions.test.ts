import { calculateGameOutcomes } from "./winningConditions";
import * as gameStates from "../data/test/gameStates";
import * as gameOutcomes from "../data/test/gameOutcomes";

describe("calculateGameOutcomes", () => {
  const testCases = [
    // Single mode
    {
      name: "Single in the dark, not caught, knows secret (Double Win)",
      state: gameStates.gameStateSingleInTheDarkDoubleWin,
      expected: gameOutcomes.outcomeSingleInTheDarkDoubleWin,
    },
    {
      name: "Single in the dark, not caught, does not know secret (Win)",
      state: gameStates.gameStateSingleInTheDarkWin,
      expected: gameOutcomes.outcomeSingleInTheDarkWin,
    },
    {
      name: "Single in the dark, caught, knows secret (Tie)",
      state: gameStates.gameStateSingleInTheDarkTie,
      expected: gameOutcomes.outcomeSingleInTheDarkTie,
    },
    {
      name: "Single in the dark, caught, does not know secret (Loss)",
      state: gameStates.gameStateSingleInTheLoopWin,
      expected: gameOutcomes.outcomeSingleInTheLoopWin,
    },
    // Team mode
    {
      name: "Team mode, both not caught, both don't know secret (Regular Win)",
      state: gameStates.gameStateTeamRegularWin,
      expected: gameOutcomes.outcomeTeamRegularWin,
    },
    {
      name: "Team mode, one or both caught, both don't know secret (Loss)",
      state: gameStates.gameStateTeamLoss,
      expected: gameOutcomes.outcomeTeamLoss,
    },
    {
      name: "Team mode, both not caught, both know secret (Double Win)",
      state: gameStates.gameStateTeamDoubleWin,
      expected: gameOutcomes.outcomeTeamDoubleWin,
    },
    {
      name: "Team mode, all caught, all know secret (Tie)",
      state: gameStates.gameStateTeamTie,
      expected: gameOutcomes.outcomeTeamTie,
    },
    // Individual mode
    {
      name: "Individual mode, one caught, one not caught, both don't know secret (Half Win)",
      state: gameStates.gameStateIndividualHalfWin,
      expected: gameOutcomes.outcomeIndividualHalfWin,
    },
    {
      name: "Individual mode, not caught, one knows secret, one doesn't (Double Win + Regular Win)",
      state: gameStates.gameStateIndividualDoubleAndRegularWin,
      expected: gameOutcomes.outcomeIndividualDoubleAndRegularWin,
    },
    {
      name: "Individual mode, one caught (loss), one not caught knows secret (one and a half win), one not caught doesn't know secret (half win)",
      state: gameStates.gameStateIndividualWinAndHalf,
      expected: gameOutcomes.outcomeIndividualWinAndHalf,
    },
    {
      name: "Individual mode, one not caught, knows secret, gets one and a half win",
      state: gameStates.gameStateIndividualOneAndHalfWin,
      expected: gameOutcomes.outcomeIndividualOneAndHalfWin,
    },
  ];

  testCases.forEach(({ name, state, expected }) => {
    it(name, () => {
      const result = calculateGameOutcomes(state);
      expect(result).toEqual(expected);
    });
  });
});
