import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
const Formulario = ({citas, setCitas, setMostrarForm}) => {
  const [paciente, setPaciente] = useState('');
  const [owner, setOwner] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintoma, setSintoma] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //Date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };
  //Time
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = time => {
    const opciones2 = {hour: 'numeric', minute: '2-digit', hour12: false};
    setHora(time.toLocaleString('en-US', opciones2));
    hideTimePicker();
  };

  const crearCita = () => {
    if (
      paciente.trim() === '' ||
      owner.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintoma.trim() === ''
    ) {
      mostrarAlerta();
      return;
    }
    const cita = {paciente, owner, telefono, fecha, hora, sintoma};
    cita.id = shortid.generate();
    console.log(cita);
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);
    //OCultar form
    setMostrarForm(false);
    //Resetear Form
  };
  const mostrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [
      {
        text: 'OK', //Arreglo de botones
      },
    ]);
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setOwner(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Teléfono Contacto</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setTelefono(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige la Fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige la hora"
            confirmTextIOS="Confirmar"
            cancelTextIOS="Cancelar"
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <Text style={styles.label}>Síntomas</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setSintoma(texto)}
            multiline
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => crearCita()}
            style={styles.agregar}>
            <Text style={styles.textoAgregar}>Agregar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  agregar: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoAgregar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
