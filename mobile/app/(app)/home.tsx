import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/useAuthStore';
import AnimatedLogo from '../../components/AnimatedLogo';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user, logout } = useAuthStore();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = height < 700;
  const isTablet = width >= 600;

  const formattedName = user?.fullName ? user.fullName.toUpperCase() : 'USER';

  const logoSize = isTablet ? 140 : (isSmallScreen ? 80 : 100);
  const welcomeFontSize = isTablet ? 32 : (isSmallScreen ? 22 : 26);
  const subtitleFontSize = isTablet ? 18 : 16;
  const logoutBtnWidth = isTablet ? 360 : '100%';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingVertical: isSmallScreen ? 24 : 40 }]}>
        <View style={styles.centerContent}>
          <AnimatedLogo size={logoSize} speed="fast" animated={true} />
          
          <Text style={[styles.welcomeText, { fontSize: welcomeFontSize, marginTop: isSmallScreen ? 20 : 32 }]}>
            Marhba, {formattedName} 👋
          </Text>
          
          <Text style={[styles.subtitleText, { fontSize: subtitleFontSize }]}>
            Your secure session is active.
          </Text>
        </View>

        <View style={[styles.bottomContainer, { maxWidth: isTablet ? 360 : undefined, alignSelf: 'center' }]}>
          <TouchableOpacity 
            style={[styles.logoutButton, { width: logoutBtnWidth }]} 
            onPress={logout}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={20} color="#ffffff" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  welcomeText: {
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  subtitleText: {
    color: '#475569',
    textAlign: 'center',
    marginBottom: 40,
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FE4161',
    borderRadius: 14,
    height: 56,
    shadowColor: '#FE4161',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
