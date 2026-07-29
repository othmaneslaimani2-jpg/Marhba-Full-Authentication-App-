import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';
import AnimatedLogo from '../components/AnimatedLogo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [logoAnimationDone, setLogoAnimationDone] = useState(false);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const isSmallScreen = screenHeight < 700;
  const isTablet = screenWidth >= 600;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (logoAnimationDone) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (!isLoading && isAuthenticated) {
          router.replace('/(app)/home');
        }
      });
    }
  }, [logoAnimationDone]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && logoAnimationDone) {
      router.replace('/(app)/home');
    }
  }, [isLoading, isAuthenticated, logoAnimationDone]);

  const handleStart = () => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(app)/home');
      } else {
        router.push('/(auth)/login');
      }
    }
  };

  const logoSize = isTablet ? 200 : (isSmallScreen ? 120 : 160);
  const titleSize = isTablet ? 36 : (isSmallScreen ? 24 : 28);
  const verticalLineHeight = isSmallScreen ? 50 : 70;

  return (
    <View style={[styles.container, { paddingVertical: isSmallScreen ? 20 : 40 }]}>
      <View style={styles.centerContent}>
        <View style={styles.logoShadowContainer}>
          <AnimatedLogo
            size={logoSize}
            speed="slow"
            animated={true}
            onAnimationComplete={() => setLogoAnimationDone(true)}
          />
        </View>
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', marginTop: isSmallScreen ? 16 : 24 }}>
          <Text style={[styles.title, { fontSize: titleSize }]}>MARHBA</Text>
          <View style={styles.line} />
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.bottomContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.badge}>
          <Ionicons name="shield" size={18} color="#FE4161" style={styles.shieldIcon} />
          <Text style={styles.badgeText}>SECURE IDENTITY MANAGEMENT</Text>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStart} activeOpacity={0.8}>
          <Text style={styles.startButtonText}>START NOW</Text>
        </TouchableOpacity>

        <View style={[styles.verticalLineContainer, { height: verticalLineHeight, marginTop: isSmallScreen ? 12 : 20 }]}>
          <LinearGradient
            colors={['#FE4161', 'rgba(254, 65, 97, 0)']}
            style={styles.verticalLine}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoShadowContainer: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontWeight: 'bold',
    color: '#800820',
    letterSpacing: 4,
    textAlign: 'center',
  },
  line: {
    width: 44,
    height: 4,
    backgroundColor: '#FE4161',
    borderRadius: 2,
    marginTop: 8,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffcfd',
    borderWidth: 1,
    borderColor: '#ffd9df',
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#FE4161',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 20,
  },
  shieldIcon: {
    marginRight: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#800820',
    letterSpacing: 1.2,
  },
  startButton: {
    backgroundColor: '#a2002f',
    borderRadius: 12,
    paddingVertical: 14,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a2002f',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1.2,
  },
  verticalLineContainer: {
    alignItems: 'center',
    width: 2,
  },
  verticalLine: {
    width: 2,
    height: '100%',
  },
});
