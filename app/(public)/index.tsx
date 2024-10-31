import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOAuth } from '@clerk/clerk-expo';
import { Colors } from '@/constants/Colors';
export default function Index() {
	const { startOAuthFlow } = useOAuth({ strategy: 'oauth_facebook' });
	const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
		strategy: 'oauth_google',
	});

	const handleContinueWithInstagram = async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow();
			console.log(createdSessionId);

			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleContinueWithGoogle = async () => {
		try {
			const { createdSessionId, setActive } = await startGoogleOAuthFlow();

			console.log(createdSessionId);

			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			}
		} catch (error) {
			console.log(error);
		}
	};

	interface buttonsDataType {
		id: number;
		text: string;
		icon: any;
		subTitle: string | null;
		onPress: () => void;
	}

	const buttonsData: buttonsDataType[] = [
		{
			id: 1,
			text: 'Continue with Instagram',
			icon: require('@/assets/images/instagram_icon.webp'),
			subTitle:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, perferendis. Optio qui dicta voluptatum repellat velit veritatis dolorem sapiente impedit.',
			onPress: handleContinueWithInstagram,
		},
		{
			id: 2,
			text: 'Continue with Google',
			icon: null,
			subTitle: null,
			onPress: handleContinueWithGoogle,
		},
		{
			id: 3,
			text: 'Use without profile',
			icon: null,
			subTitle:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, perferendis. Optio qui dicta voluptatum repellat velit veritatis dolorem sapiente impedit.',
			onPress: () => {},
		},
	];

	return (
		<View style={styles.container}>
			<Image
				source={require('@/assets/images/login.png')}
				style={styles.logInImage}
			/>
			<ScrollView contentContainerStyle={styles.containerScroll}>
				<Text style={styles.title}>How do you like to use Threads?</Text>
				<View style={styles.buttonContainer}>
					{buttonsData.map((button) => (
						<TouchableOpacity
							key={button.id}
							style={styles.loginButton}
							onPress={button.onPress}
						>
							<View style={styles.loginButtonInstagramInner}>
								{button.icon && (
									<Image
										source={button.icon}
										style={styles.loginButtonInstagramIcon}
									/>
								)}
								<Text style={styles.loginButtonText}>{button.text}</Text>
								<Ionicons
									name="chevron-forward"
									size={20}
									color={Colors.light.icon}
								/>
							</View>
							{button.subTitle && (
								<Text style={styles.loginButtonSubTitle}>
									{button.subTitle}
								</Text>
							)}
						</TouchableOpacity>
					))}
					<TouchableOpacity>
						<Text style={styles.switchButtonAccount}>Switch account</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	containerScroll: {
		alignItems: 'center',
		width: '100%',
		padding: 20,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.light.background,
	},
	logInImage: {
		width: '100%',
		height: 350,
		top: -20,
		resizeMode: 'stretch',
		backgroundColor: Colors.light.background,
	},
	title: {
		fontFamily: 'DMSans_700Bold',
		fontSize: 17,
	},
	buttonContainer: {
		marginTop: 20,
		gap: 20,
		width: '100%',
	},
	loginButton: {
		width: '100%',
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: Colors.light.borderColor,
	},
	loginButtonText: {
		fontFamily: 'DMSans_700Bold',
		fontSize: 16,
	},
	loginButtonInstagramInner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
		width: '100%',
	},
	loginButtonInstagramIcon: {
		width: 50,
		height: 50,
		resizeMode: 'contain',
	},
	loginButtonArrow: {
		width: 10,
		height: 10,
		borderTopWidth: 1,
		borderRightWidth: 1,
		borderColor: Colors.light.borderColor,
		transform: [{ rotate: '45deg' }],
	},
	loginButtonSubTitle: {
		marginTop: 10,
		fontFamily: 'DMSans_400Regular',
		fontSize: 12,
		color: Colors.light.icon,
	},
	switchButtonAccount: {
		fontSize: 14,
		color: Colors.light.icon,
		alignSelf: 'center',
	},
});
