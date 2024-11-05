import { Stack, Slot, SplashScreen } from 'expo-router';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { LogBox } from 'react-native';
import { useEffect } from 'react';
import { tokenCache } from '@/utils/cache';
import {
	useFonts,
	DMSans_400Regular,
	DMSans_700Bold,
	DMSans_400Regular_Italic,
} from '@expo-google-fonts/dm-sans';
export * as SplashScreen from 'expo-splash-screen';

import { ConvexReactClient, ConvexProvider } from 'convex/react';
// import { ConvexProviderWithClerk } from 'convex/react-clerk';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
	unsavedChangesWarning: false,
});

const clerkPublisherKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!clerkPublisherKey) {
	throw new Error(
		'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
	);
}

LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);
// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
const InitialLayout = () => {
	const [fontsLoaded] = useFonts({
		DMSans_400Regular,
		DMSans_700Bold,
		DMSans_400Regular_Italic,
	});

	useEffect(() => {
		SplashScreen.preventAutoHideAsync();
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	} else {
		SplashScreen.hideAsync();
	}

	return <Slot />;
};
export default function RootLayout() {
	return (
		<ClerkProvider publishableKey={clerkPublisherKey!} tokenCache={tokenCache}>
			<ClerkLoaded>
				{/* useAuth={useAuth} */}
				<ConvexProvider client={convex}>
					<InitialLayout />
				</ConvexProvider>
			</ClerkLoaded>
		</ClerkProvider>
	);
}
