import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {AppForm, AppFormField, SubmitButton} from '../../Components/forms';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/AntDesign';
import color from '../../Config/color';
import uuid from 'react-native-uuid';

function VirtualizedView(props) {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => 'dummy'}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    />
  );
}

const AddSoftwareForm = () => {
  const [installedSoftware, setInstalledSoftware] = useState([]);
  const handleSubmit = ({logiciel}) => {
    setInstalledSoftware(prevArr => [...prevArr, logiciel]);
  };
  const validationSchema = Yup.object().shape({
    logiciel: Yup.string().required('Veuillez indiquer le logiciel'),
  });
  return (
    <AppForm
      initialValues={{
        logiciel: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '60%'}}>
          <AppFormField
            name="logiciel"
            placeholder="logiciel"
            containerStyle={{marginTop: null}}
          />
        </View>
        <View style={{width: '35%'}}>
          <SubmitButton title="Ajouter" />
        </View>
      </View>
      <View>
        <FlatList
          data={installedSoftware}
          keyExtractor={() => uuid.v4()}
          renderItem={({item}) => (
            <View style={styles.listContainer}>
              <View style={styles.listItemContainer}>
                <Icon name="check" size={26} color={color.primary} />
                <Text style={styles.text}>{item}</Text>
              </View>
            </View>
          )}
          numColumns={2}
        />
      </View>
    </AppForm>
  );
};

export default AddSoftwareForm;

const styles = StyleSheet.create({
  listContainer: {flexDirection: 'row', marginVertical: 15},
  listItemContainer: {
    width: '50%',
    flexDirection: 'row',
  },
  text: {fontSize: 18, fontWeight: '600'},
});
