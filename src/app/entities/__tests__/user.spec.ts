import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { User } from "../User";

vi.mock("../../../infra/adapters/idAdapter", () => ({
  IdAdapter: vi.fn().mockImplementation(() => ({
    generate: () => "mocked-id",
  })),
}));

describe("User entity", () => {
  let mockDate: Date;

  beforeEach(() => {
    mockDate = new Date();
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("create", () => {
    it("should create a new user with correct properties", () => {
      const userProps = {
        name: "John Doe",
        mail: "john@example.com",
        password: "password123",
        utc: -3,
      };

      const user = User.create(userProps);

      expect(user.id).toBe("mocked-id");
      expect(user.name).toBe(userProps.name);
      expect(user.mail).toBe(userProps.mail);
      expect(user.password).toBe(userProps.password);
      expect(user.utc).toBe(userProps.utc);
      expect(user.createdAt).toEqual(mockDate);
      expect(user.updatedAt).toEqual(mockDate);
    });
  });

  describe("restore", () => {
    it("should restore a user from existing data", () => {
      const existingUser = {
        id: "existing-id",
        name: "Jane Doe",
        mail: "jane@example.com",
        password: "securepassword",
        utc: -5,
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
      };

      const user = User.restore(existingUser);

      expect(user.id).toBe(existingUser.id);
      expect(user.name).toBe(existingUser.name);
      expect(user.mail).toBe(existingUser.mail);
      expect(user.password).toBe(existingUser.password);
      expect(user.utc).toBe(existingUser.utc);
      expect(user.createdAt).toEqual(existingUser.createdAt);
      expect(user.updatedAt).toEqual(existingUser.updatedAt);
    });
  });

  describe("update", () => {
    it("should update only the name", () => {
      const user = User.create({
        name: "Original Name",
        mail: "original@example.com",
        password: "password",
        utc: 0,
      });

      const originalUpdatedAt = user.updatedAt;
      vi.setSystemTime(new Date(mockDate.getTime() + 1000));

      user.update({ name: "New Name" });

      expect(user.name).toBe("New Name");
      expect(user.mail).toBe("original@example.com");
      expect(user.updatedAt).not.toEqual(originalUpdatedAt);
    });

    it("should update only the mail", () => {
      const user = User.create({
        name: "Test User",
        mail: "old@example.com",
        password: "password",
        utc: 0,
      });

      const originalUpdatedAt = user.updatedAt;
      vi.setSystemTime(new Date(mockDate.getTime() + 1000));

      user.update({ mail: "new@example.com" });

      expect(user.name).toBe("Test User");
      expect(user.mail).toBe("new@example.com");
      expect(user.updatedAt).not.toEqual(originalUpdatedAt);
    });

    it("should update both name and mail", () => {
      const user = User.create({
        name: "Original Name",
        mail: "original@example.com",
        password: "password",
        utc: 0,
      });

      user.update({ name: "Updated Name", mail: "updated@example.com" });

      expect(user.name).toBe("Updated Name");
      expect(user.mail).toBe("updated@example.com");
    });
  });

  describe("toJson", () => {
    it("should return user data without the password", () => {
      const user = User.create({
        name: "John Doe",
        mail: "john@example.com",
        password: "secret123",
        utc: -3,
      });

      const json = user.toJson();

      expect(json).toEqual({
        id: "mocked-id",
        name: "John Doe",
        mail: "john@example.com",
        utc: -3,
        createdAt: mockDate,
        updatedAt: mockDate,
      });

      expect(json).not.toHaveProperty("password");
    });
  });
});
