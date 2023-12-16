import {
  addDoc,
  collection,
  doc,
  query,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { firestore } from '../shared/firebase/config';

const getQuerySurvey = ()=> {
  return query(collection(firestore, 'pesquisas'));
};

const createSurvey = async (data) => {
  data = {...data,
    terrivel: 0,
    ruim: 0,
    neutro: 0,
    bom: 0,
    otimo: 0
  };

  return await addDoc(collection(firestore, 'pesquisas'), data);
};

const atualizarSurvey = async (docId, newData) => {
  const document = doc(firestore, 'pesquisas', docId);

  return await updateDoc(document, newData);
};

const deletarSurvey = async (docId) => {
  const document = doc(firestore, 'pesquisas', docId);

  return await deleteDoc(document);
};

export {createSurvey, atualizarSurvey, deletarSurvey, getQuerySurvey };
