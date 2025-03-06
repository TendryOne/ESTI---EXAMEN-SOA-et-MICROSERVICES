<template>
  <div class="employee-container">
    <div class="employee-info">
      <h2>Informations de l'employé</h2>
      <div class="info-item">
        <label>Nom:</label>
        <span>{{ user?.nomComplet }}</span>
      </div>
      <div class="info-item">
        <label>Numéro d'employé:</label>
        <span>{{ user?.numeroEmploye }}</span>
      </div>
      <div class="info-item">
        <label>Numéro d'assurance sociale:</label>
        <span>{{ user?.NAS }}</span>
      </div>
      <div class="info-item">
        <label>Adresse:</label>
        <span>{{ user?.adresse }}</span>
      </div>
    </div>

    <div class="beneficiary-form">
      <h2>Modifier le bénéficiaire</h2>
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="form-group">
          <label for="beneficiaryName">Nom du bénéficiaire</label>
          <Field name="beneficiaryName" type="text" v-model="beneficiaryName" />
          <ErrorMessage name="beneficiaryName" class="error-message" />
        </div>
        <button type="submit" class="submit-button">Valider</button>
      </Form>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <p>Mise à jour du bénéficiaire réussie !</p>
        <button @click="closeModal">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as zod from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';


interface User {
  nomComplet: string;
  numeroEmploye: string;
  NAS: string;
  adresse: string;
}

interface Beneficiary {
  nomBeneficiaire: string;
}

const route = useRoute();
const router = useRouter();

const user = ref<User | null>(null);
const beneficiary = ref<Beneficiary | null>(null);
const beneficiaryName = ref('');
const showModal = ref(false);

const schema = toFormValidator(
  zod.object({
    beneficiaryName: zod.string().min(1, 'Le nom du bénéficiaire est requis'),
  })
);

watchEffect(async () => {
  try {
    if (route.params.employeeId && route.params.NAS) {
      const response = await axios.get('/api/beneficiary', {
        params: {
          NAS: route.params.NAS,
          numeroEmploye: route.params.employeeId,
        },
      });

      user.value = response.data.user;
      beneficiary.value = response.data.beneficiary;
      beneficiaryName.value = beneficiary.value?.nomBeneficiaire || '';
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
});

const onSubmit = async (values: any) => {
  try {
    if (!user.value || !beneficiary.value) return;
    const response = await axios.patch('/api/beneficiary', {
      numeroEmploye: user.value.numeroEmploye,
      nomBeneficiaire: values.beneficiaryName,
    });

    console.log('Bénéficiaire mis à jour:', response.data);
    beneficiary.value.nomBeneficiaire = values.beneficiaryName;

    showModal.value = true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du bénéficiaire:', error);
  }
};

const closeModal = () => {
  showModal.value = false;
  router.push('/');
};
</script>

<style scoped>
.employee-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.employee-info,
.beneficiary-form {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
}

.info-item label {
  font-weight: bold;
  margin-right: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error-message {
  color: red;
  font-size: 0.875em;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

/* Styles pour le modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal p {
  margin-bottom: 20px;
}

.modal button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal button:hover {
  background-color: #0056b3;
}
</style>
