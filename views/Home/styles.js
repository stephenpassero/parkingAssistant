import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D4D9",
    alignItems: "center",
    justifyContent: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3066BE",
    paddingBottom: 100
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#3066BE",
    borderRadius: 10
  },
  buttonText: {
    padding: 20,
    color: "#D3D4D9",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export { styles }
