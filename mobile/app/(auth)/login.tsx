import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuthStore, AuthState } from '../../store/useAuthStore';
import AnimatedLogo from '../../components/AnimatedLogo';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const isSmallScreen = screenHeight < 700;
  const isTablet = screenWidth >= 600;

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const login = useAuthStore((state: AuthState) => state.login);

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  const logoSize = isTablet ? 100 : (isSmallScreen ? 60 : 80);
  const cardPadding = isTablet ? 32 : 24;
  const brandingTitleSize = isTablet ? 38 : 32;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.headerContainer, { marginBottom: isSmallScreen ? 16 : 32 }]}>
            <AnimatedLogo size={logoSize} speed="fast" animated={true} />
            <Text style={[styles.brandingTitle, { fontSize: brandingTitleSize, marginTop: isSmallScreen ? 8 : 16 }]}>
              Marhba
            </Text>
          </View>

          <View style={[styles.card, { padding: cardPadding }]}>
            <Text style={styles.cardTitle}>Login</Text>

            <View style={[styles.inputWrapper, emailFocused && styles.inputWrapperFocused]}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={emailFocused ? '#FE4161' : '#94a3b8'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError('');
                }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            <View style={[styles.inputWrapper, passwordFocused && styles.inputWrapperFocused]}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={passwordFocused ? '#FE4161' : '#94a3b8'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (error) setError('');
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle-outline" size={18} color="#ef4444" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footerLinkContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLinkText}>Register</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fc' },
  keyboardView: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 24 },
  headerContainer: { alignItems: 'center' },
  brandingTitle: { fontWeight: 'bold', color: '#FE4161', letterSpacing: 0.5 },
  card: { backgroundColor: '#ffffff', borderRadius: 24, shadowColor: '#000000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 4, width: '100%', maxWidth: 440, alignSelf: 'center' },
  cardTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', textAlign: 'center', marginBottom: 24 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 16, height: 56, marginBottom: 16, backgroundColor: '#ffffff' },
  inputWrapperFocused: { borderColor: '#FE4161' },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: '#1e293b', fontSize: 15, paddingVertical: 10 },
  eyeButton: { padding: 4 },
  errorContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor: '#fef2f2', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#fee2e2' },
  errorText: { color: '#ef4444', fontSize: 14, marginLeft: 8, flex: 1 },
  button: { backgroundColor: '#FE4161', borderRadius: 12, height: 56, justifyContent: 'center', alignItems: 'center', marginTop: 8, shadowColor: '#FE4161', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  footerLinkContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 28 },
  footerText: { color: '#64748b', fontSize: 14 },
  footerLinkText: { color: '#FE4161', fontWeight: 'bold', fontSize: 14 },
});