import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    innerContainer: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
    },
    header: {
        width: 260,
        marginTop: 100,
        marginBottom: 20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    subHeader: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 30,
        color: '#000',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    loginButton: {
        height: 50,
        backgroundColor: '#541c89',
        borderRadius: 39,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    linkText: {
        color: '#0066cc',
        fontSize: 16,
        fontWeight: 600,
        color: '#b89564',
    },
    signUpContainer: {
    alignItems: 'center',
    },
    signUpText: {
        color: '#666',
        fontSize: 16,
        marginRight: 5,
    },
    signUpLink: {
        fontWeight: '600',
    },
    outlineButton: {
        height: 50,
        borderWidth: 2,
        borderColor: '#b89564',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    outlineButtonText: {
        color: '#b89564',
        fontSize: 16,
        fontWeight: '600',
    },
    signUpContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});

export default LoginStyles;