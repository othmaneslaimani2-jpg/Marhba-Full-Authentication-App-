import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../store/useAuthStore';

const StackProtected = Stack.Protected as any;

export default function RootLayout() {
  const { isAuthenticated, restoreSession } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />

        <StackProtected guard={!isAuthenticated} redirect="/(app)/home">
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/register" />
        </StackProtected>

        <StackProtected guard={isAuthenticated} redirect="/(auth)/login">
          <Stack.Screen name="(app)/home" />
        </StackProtected>
      </Stack>
    </>
  );
}
