<template>
    <div class="card"
    >
        <div class="header">
            <h3> Information utilisateur</h3>
        </div>

        <div class="body">
            <v-text-field
                    label="E-mail"
                    :rules="[rules.email]"
                    placeholder="Placeholder"
                    outlined
                    type="email"
                    v-model="email"
            ></v-text-field>
            <v-text-field
                    label="Departement"
                    placeholder="Placeholder"
                    :rules="[rules.zip]"
                    outlined
                    v-model="departement"
            ></v-text-field>
            <v-checkbox
                    v-model="isAdmin"
                    label="Admin"
            ></v-checkbox>
        </div>
        <div class="footer">
            <v-btn @click="save"> Créer</v-btn>
        </div>
    </div>

</template>

<script>
  import UserManager from "../UserManager"

  export default {
    name: 'Create User',
    data() {
      return {
        email: '',
        departement: -1,
        rules: {
          email: ( value ) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test( value ) || 'Invalid e-mail.';
          },
          // eslint-disable-next-line no-restricted-globals
          zip: value => (value.length === 5 && !(isNaN( value ))) || 'Departement invalide',
        },
        isAdmin: false,
        notSaved: true,
        userManager: null
      };
    },
    computed: {
      displayError() {
        if (this.notSaved) return false;
        return !(this.email !== '' && this.departement !== -1);
      },
    },
    methods: {

      validate() {
        return this.email !== '' && this.departement !== -1;
      },
      save() {
        this.notSaved = false;

        if (!this.validate()) return;
        const event = {};
        event.email = this.email;
        event.departement = this.departement;
        this.userManager.register( this.email, this.departement, this.isAdmin )
        this.$emit( 'saved', event );
      },
    },
    mounted() {
      this.userManager = new UserManager()
    }
  };
</script>

<style scoped>
    .header {
        position: absolute;
        top: 10%;
    }

    .card {
        width: 100%;
        height: 100%;
        background: rgba(216, 216, 216, 100);
        border-radius: 1%;
        box-shadow: 1px solid rgba(0, 0, 0, 0.50);
        padding: 3%;
        position: relative;
    }

    .footer {
        position: absolute;
        padding-bottom: 5%;
        bottom: 0;
    }

    .body {
        position: absolute;
        top: 20%;
        left: 25%;
        width: 50%;
    }
</style>
