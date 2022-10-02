import React, {useRef, useState, useEffect, useMemo} from 'react';
import {AppForm} from '../../Components/forms';
import * as Yup from 'yup';
import osOptions from '../../Utils/osOptions';
import OsSwitchSelector from '../../Components/OsSwitchSelector';
import AdvancedChecklistButton from '../../Components/AdvancedChecklistButton';
import softwareService from '../../Services/softwareService';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
const AddSoftwareForm = ({
  getSelectedIds = () => {},
  setLoading = () => {},
}) => {
  let selectedSoftwareList = useMemo(
    () => ({windows: [], linux: [], macos: []}),
    [],
  );
  const [, setListLength] = useState(0);

  let idsList = useMemo(() => ({}), []);
  const addSoftwareRef = useRef();
  const [selectedOs, setSelectedOs] = useState(osOptions[0].value);
  const [reload, setReload] = useState(0);
  const [softwareList, setSoftwareList] = useState([]);
  const getSelectedIdsAndItems = (name, ids, listItems) => {
    selectedSoftwareList[name] = listItems;
    idsList[name] = ids;
    getSelectedIds(idsList);
    setListLength(listItems.length);
  };

  useEffect(() => {
    softwareService
      .getAllSoftwaresApi()
      .then(({data}) => {
        setSoftwareList(
          data.map(software => ({...software, id: software?._id})),
        );
      })
      .catch(() =>
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Erreur',
          textBody:
            "Une erreur s'est produite lors de l'exécution de l'opération",
          autoClose: 3000,
        }),
      );
  }, [reload]);

  const handleSubmit = values => {};
  const validationSchema = Yup.object().shape({
    os: Yup.string().required("Veuillez indiquer l'os"),
  });
  return (
    <AppForm
      initialValues={{
        os: osOptions[0].value,
        macos: null,
        linux: null,
        windows: null,
      }}
      innerRef={addSoftwareRef}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}>
      <OsSwitchSelector name="os" getSelectedItem={setSelectedOs} />
      <AdvancedChecklistButton
        placeholder="logiciel"
        name={selectedOs}
        list={softwareList}
        getSelectedIdsAndItems={getSelectedIdsAndItems}
        selectedSoftware={selectedSoftwareList}
        setReload={setReload}
        setLoading={setLoading}
      />
    </AppForm>
  );
};

export default AddSoftwareForm;
