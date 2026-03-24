<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const form = ref({
  patientId: '',
  description: '',
  dateOfOnset: '',
  severity: '',
  relationshipToStudyDrug: ''
})

const patientName = ref('')
const isCheckingPatient = ref(false)
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Watch Patient ID to fetch name
watch(() => form.value.patientId, async (newId) => {
  if (newId.length >= 3) {
    isCheckingPatient.value = true
    try {
      const response = await fetch(`${apiBaseUrl}/api/patients/${newId}`)
      if (response.ok) {
        const data = await response.json()
        patientName.value = data.fullName
      } else {
        patientName.value = 'Patient not found'
      }
    } catch (error) {
      console.error('Error fetching patient:', error)
      patientName.value = ''
    } finally {
      isCheckingPatient.value = false
    }
  } else {
    patientName.value = ''
  }
})

const validate = () => {
  errors.value = {}
  if (!form.value.patientId) errors.value.patientId = 'Patient ID is required'
  if (!form.value.description) errors.value.description = 'Description is required'
  if (!form.value.dateOfOnset) errors.value.dateOfOnset = 'Date of onset is required'
  if (!form.value.severity) errors.value.severity = 'Severity is required'
  if (!form.value.relationshipToStudyDrug) errors.value.relationshipToStudyDrug = 'Relationship is required'
  
  if (form.value.dateOfOnset) {
    const selectedDate = new Date(form.value.dateOfOnset)
    if (selectedDate > new Date()) {
      errors.value.dateOfOnset = 'Date of onset cannot be in the future'
    }
  }

  return Object.keys(errors.value).length === 0
}

const handleSave = async () => {
  if (!validate()) return

  isSubmitting.value = true
  try {
    const response = await fetch(`${apiBaseUrl}/api/adverse-events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      alert('Adverse event saved')
      router.push('/')
    } else {
      const errorText = await response.text()
      alert(`Error saving event: ${errorText}`)
    }
  } catch (error) {
    console.error('Submission error:', error)
    alert('Failed to connect to the server.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="form-page">
    <div class="form-card">
      <header class="form-header">
        <router-link to="/" class="back-link">← Back to Portal</router-link>
        <h2>Report Adverse Event</h2>
        <p>Ensure all clinical trial safety data is documented accurately.</p>
      </header>

      <form @submit.prevent="handleSave" class="ae-form">
        <!-- Patient ID -->
        <div class="form-group">
          <label for="patientId">Patient ID *</label>
          <input 
            id="patientId"
            v-model="form.patientId" 
            type="text" 
            placeholder="e.g. P001"
            :class="{ 'error-input': errors.patientId }"
          />
          <div v-if="isCheckingPatient" class="verifying">Verifying identifier...</div>
          <div v-else-if="patientName" :class="['patient-display', { 'not-found': patientName === 'Patient not found' }]">
            {{ patientName }}
          </div>
          <span v-if="errors.patientId" class="error-text">{{ errors.patientId }}</span>
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description">Adverse Event Description *</label>
          <textarea 
            id="description"
            v-model="form.description" 
            rows="4"
            placeholder="Describe the symptoms, circumstances, and observations..."
            :class="{ 'error-input': errors.description }"
          ></textarea>
          <span v-if="errors.description" class="error-text">{{ errors.description }}</span>
        </div>

        <div class="form-row">
          <!-- Date of Onset -->
          <div class="form-group">
            <label for="dateOfOnset">Date of Onset *</label>
            <input 
              id="dateOfOnset"
              v-model="form.dateOfOnset" 
              type="date" 
              :class="{ 'error-input': errors.dateOfOnset }"
            />
            <span v-if="errors.dateOfOnset" class="error-text">{{ errors.dateOfOnset }}</span>
          </div>

          <!-- Severity -->
          <div class="form-group">
            <label for="severity">Severity *</label>
            <select id="severity" v-model="form.severity" :class="{ 'error-input': errors.severity }">
              <option value="" disabled>Select severity</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
            <span v-if="errors.severity" class="error-text">{{ errors.severity }}</span>
          </div>
        </div>

        <!-- Relationship -->
        <div class="form-group">
          <label for="relationship">Relationship to Study Drug *</label>
          <select id="relationship" v-model="form.relationshipToStudyDrug" :class="{ 'error-input': errors.relationshipToStudyDrug }">
            <option value="" disabled>Select relationship</option>
            <option value="Unrelated">Unrelated</option>
            <option value="Possibly Related">Possibly Related</option>
            <option value="Related">Related</option>
          </select>
          <span v-if="errors.relationshipToStudyDrug" class="error-text">{{ errors.relationshipToStudyDrug }}</span>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn-save" :disabled="isSubmitting">
            {{ isSubmitting ? 'Saving...' : 'Save Adverse Event' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-page {
  padding: 2rem;
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.form-card {
  background: white;
  width: 100%;
  max-width: 700px;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.form-header {
  margin-bottom: 2rem;
}

.back-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 1rem;
}

.back-link:hover {
  color: #2563eb;
}

.form-header h2 {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #64748b;
}

.ae-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

input, textarea, select {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #2563eb;
  ring: 2px solid rgba(37, 99, 235, 0.1);
}

.error-input {
  border-color: #ef4444;
}

.error-text {
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 500;
}

.verifying {
  font-size: 0.875rem;
  color: #64748b;
  font-style: italic;
}

.patient-display {
  font-size: 0.875rem;
  font-weight: 600;
  color: #059669;
  background: #ecfdf5;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  display: inline-block;
}

.patient-display.not-found {
  color: #dc2626;
  background: #fef2f2;
}

.form-footer {
  margin-top: 1rem;
}

.btn-save {
  width: 100%;
  padding: 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-save:hover {
  background: #1d4ed8;
}

.btn-save:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-card {
    padding: 1.5rem;
  }
}
</style>
