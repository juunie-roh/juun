import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { create } from "zustand";

import { logger } from "./logger"; // Adjust the import path as needed

// Mock console.log
const mockedConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

// Type definitions for our test store
interface TestState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

describe("Zustand Logger Middleware", () => {
  beforeEach(() => {
    // Clear mock before each test
    mockedConsoleLog.mockClear();
  });

  afterAll(() => {
    // Restore console.log after all tests
    mockedConsoleLog.mockRestore();
  });

  it("should log state changes when using set", () => {
    // Create store with logger
    const useStore = create<TestState>()(
      logger(
        (set) => ({
          count: 0,
          increment: () => set((state) => ({ count: state.count + 1 })),
          decrement: () => set((state) => ({ count: state.count - 1 })),
        }),
        "testStore",
      ),
    );

    // Get actions from store
    const { increment, decrement } = useStore.getState();

    // Test increment
    increment();
    expect(mockedConsoleLog).toHaveBeenCalledWith(
      "🚀 ~ State Logger ~ set:",
      "testStore:",
      {
        count: 1,
        increment: expect.any(Function),
        decrement: expect.any(Function),
      },
    );

    // Test decrement
    decrement();
    expect(mockedConsoleLog).toHaveBeenCalledWith(
      "🚀 ~ State Logger ~ set:",
      "testStore:",
      {
        count: 0,
        increment: expect.any(Function),
        decrement: expect.any(Function),
      },
    );
  });

  it("should log state changes when using setState", () => {
    // Create store with logger
    const useStore = create<TestState>()(
      logger(
        (set) => ({
          count: 0,
          increment: () => set((state) => ({ count: state.count + 1 })),
          decrement: () => set((state) => ({ count: state.count - 1 })),
        }),
        "testStore",
      ),
    );

    // Test direct setState
    useStore.setState({ count: 5 });
    expect(mockedConsoleLog).toHaveBeenCalledWith(
      "🚀 ~ State Logger ~ store.setState:",
      "testStore:",
      {
        count: 5,
        increment: expect.any(Function),
        decrement: expect.any(Function),
      },
    );
  });

  it("should work without a store name", () => {
    // Create store with logger but no name
    const useStore = create<TestState>()(
      logger((set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
      })),
    );

    // Test increment
    useStore.getState().increment();
    expect(mockedConsoleLog).toHaveBeenCalledWith("🚀 ~ State Logger ~ set:", {
      count: 1,
      increment: expect.any(Function),
      decrement: expect.any(Function),
    });
  });

  it("should maintain correct state after multiple updates", () => {
    // Create store with logger
    const useStore = create<TestState>()(
      logger(
        (set) => ({
          count: 0,
          increment: () => set((state) => ({ count: state.count + 1 })),
          decrement: () => set((state) => ({ count: state.count - 1 })),
        }),
        "testStore",
      ),
    );

    // Perform multiple updates
    const { increment } = useStore.getState();
    increment();
    increment();
    increment();

    // Check final state
    expect(useStore.getState().count).toBe(3);
    expect(mockedConsoleLog).toHaveBeenCalledTimes(3);
  });

  it("should log correctly when using setState without a store name", () => {
    // Create store with logger but no name
    const useStore = create<TestState>()(
      logger((set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
      })),
    );

    // Test setState without a name
    useStore.setState({ count: 10 });
    expect(mockedConsoleLog).toHaveBeenCalledWith(
      "🚀 ~ State Logger ~ store.setState:",
      {
        count: 10,
        increment: expect.any(Function),
        decrement: expect.any(Function),
      },
    );
  });

  it("should handle partial state updates", () => {
    interface ExtendedState extends TestState {
      name: string;
    }

    const useStore = create<ExtendedState>()(
      logger(
        (set) => ({
          count: 0,
          name: "test",
          increment: () => set((state) => ({ count: state.count + 1 })),
          decrement: () => set((state) => ({ count: state.count - 1 })),
        }),
        "testStore",
      ),
    );

    // Update only count
    useStore.setState({ count: 5 });

    // Verify that other state properties remain unchanged
    const state = useStore.getState();
    expect(state).toEqual({
      count: 5,
      name: "test",
      increment: expect.any(Function),
      decrement: expect.any(Function),
    });
  });
});
