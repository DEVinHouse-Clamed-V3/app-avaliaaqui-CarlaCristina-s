import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavigationProp } from "@react-navigation/native";
import { AirbnbRating } from 'react-native-ratings';
import { Switch } from "react-native-switch";

interface FormProps {
  navigation: NavigationProp<any>;
}

export default function FormAva({ navigation }: FormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [recommend, setRecommend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<number>(0);

  const handleFeedback = (newFeedback: number) => { 
    setFeedback(newFeedback);
  };

  const handleSubmit = async () => {
    if (!name || !email || !experience ||  feedback === 0) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const validateEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    
    if (!validateEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    const data = {
      name: name,
      email: email,
      experience: experience,
      recommend: recommend,
      feedback: feedback,
    };

    try {
      setLoading(true);
      await axios.post("http://192.168.1.70:3000/evaluations", data);
      Alert.alert("Sucesso", "Feedback enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o feedback", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar o feedback.");
    } finally {
      setLoading(false); 
    }
  };


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.feedbackText}>Nos dê seu Feedback</Text>
        <Text style={styles.feedbackTextTwo}>
          Sua opinião é importante para nós. Por favor, compartilhe sua experiência.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nome"
        placeholderTextColor="#ccc"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Email"
        placeholderTextColor="#ccc"
      />

      <TextInput
        style={styles.input}
        value={experience}
        onChangeText={setExperience}
        placeholder="Descreva sua experiência"
        placeholderTextColor="#ccc"
        multiline
        numberOfLines={3}
        maxLength={60}
      />

      <View>
        <Text style={styles.feedbackText}>Compartilhe seu feedback</Text>
        <AirbnbRating
          count={5}
          reviews={['Ruim', 'Regular', 'Bom', 'Muito Bom', 'Ótimo']}
          defaultRating={feedback} 
          onFinishRating={handleFeedback}
          size={30}
          reviewSize={12}
          reviewColor="#317bcf"
          selectedColor="#317bcf"
        />
      
      </View>

      <View>
        <Text style={styles.feedbackText}>
          Recomendaria para outras pessoas?
        </Text>
        <View style={styles.feedbackSwitch}>
          <Switch
            value={recommend}
            onValueChange={(value) => setRecommend(value)}
            activeText={"Sim"}
            inActiveText={"Não"}
            backgroundActive={"#317bcf"}
            backgroundInactive={"#ccc"}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.buttonFeedback} onPress={handleSubmit}>
        <Text style={styles.buttonFeedbackText}>Enviar Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  feedbackText: {
    textAlign: "center",
    fontSize: 18,
    color: '#666',
    fontWeight: "bold",
    marginVertical: 10,
  },
  feedbackTextTwo: {
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
    color: '#666'
  },
  feedbackSwitch: {
    alignItems: 'center'
  },
  buttonFeedback: {
    backgroundColor: "#317bcf",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 10,
  },
  buttonFeedbackText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
