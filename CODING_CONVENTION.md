# Naming Conventions for a Large Next.js Project

## Folder and File Names

-   **Kebab Case**: Use kebab case for all folder and file names.
    -   Examples:
        -   `get-user-info.tsx`
        -   `get-image.tsx`
        -   `user-profile`

## Interface, Type, Component, CSS Module Class Names

-   **Pascal Case**: Use Pascal case for interfaces, types, components, and CSS module class names.
    -   Examples:
        -   `UserLoginForm`
        -   `UserProfile`
        -   `UserInfoType`
        -   `UserCard`

## Hook, Function, and Variable Names

-   **Camel Case**: Use camel case for hooks, functions, and variable names.
    -   Examples:
        -   `useGetUserInfo`
        -   `fetchUserData`
        -   `userProfileData`

## Summary

-   **Folder and File Names**: `kebab-case`
-   **Interface, Type, Component, CSS Module Class Names**: `PascalCase`
-   **Hook, Function, and Variable Names**: `camelCase`

## Example Project Structure

```plaintext
src/
├── components/
│   ├── user-login-form/
│   │   ├── user-login-form.tsx
│   │   ├── user-login-form.module.css
├── hooks/
│   ├── use-get-user-info.ts
├── pages/
│   ├── index.tsx
│   ├── user-profile/
│   │   ├── get-user-info.tsx
```

## Detailed Examples

### Folder and File Naming

-   `src/pages/user-profile/get-user-info.tsx`
-   `src/components/user-login-form/user-login-form.tsx`
-   `src/hooks/use-get-user-info.ts`

### Interface, Type, Component, CSS Module Class Naming

-   Interface: `UserProfileData`
-   Type: `UserInfoType`
-   Component: `UserLoginForm`
-   CSS Module Class: `UserCard`

### Hook, Function, Variable Naming

-   Hook: `useFetchUserProfile`
-   Function: `fetchUserData`
-   Variable: `userProfileData`

By following these conventions, you ensure consistency and readability across your project, making it easier for all team members to navigate and understand the codebase.
