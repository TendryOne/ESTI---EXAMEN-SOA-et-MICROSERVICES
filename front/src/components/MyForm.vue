<template>
  <div class="form-container">
    <h1>Formulaire Employé</h1>
    <Form @submit="onSubmit" :validation-schema="schema" class="form">
      <pre> vous pouvez tester :
        - Numero employe : EMP327024
        - NAS : 174933419
      //////////////////
        -Numero Employe : EMP614104
        - NAS : 521783611

      </pre>

      <div class="form-group">
        <label for="numeroEmploye">Numéro de l'employé</label>
        <Field id="numeroEmploye" name="numeroEmploye" type="text" class="form-input" placeholder="EMP123" />
        <ErrorMessage name="numeroEmploye" class="error-message" />
      </div>

      <div class="form-group">
        <label for="NAS">Numéro d'assurance sociale (NAS)</label>
        <Field id="NAS" name="NAS" type="text" class="form-input" placeholder="123-456-789" />
        <ErrorMessage name="NAS" class="error-message" />
      </div>
      <div class="error" v-if="errorServer">
        <p>{{ errorServer }}</p>
      </div>
      <button type="submit" class="submit-button">Soumettre</button>
    </Form>

  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter()
const errorServer = ref<string | null>(null)

const schema = toTypedSchema(
  zod.object({
    numeroEmploye: zod.string().min(1, 'Le numéro de l\'employé est requis'),
    NAS: zod.string().min(1, 'Le NAS est requis').regex(/^\d{3}\d{3}\d{3}$/, 'Le NAS doit être au format 123456789'),
  })
);

const onSubmit = async (values: any) => {
  try {
    console.log('Formulaire soumis !', values);
    const response = await axios.post('/api/authenticate', values);
    router.push(`/user/${response.data.user.numeroEmploye}/${response.data.user.NAS}`)
  } catch (error: any) {
    errorServer.value = error.response.data;

  }

};
</script>

<style scoped>
.error {
  color: #ff0000;
  margin-left: 10px;
}

.form-container {

  width: 500px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #555;
}

.form-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #007bff;
}

.error-message {
  font-size: 12px;
  color: #ff0000;
  margin-top: 4px;
}

.submit-button {
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
