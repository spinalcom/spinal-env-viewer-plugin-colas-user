<template>
    <v-app dark>
        <v-dialog
                v-model="open" width="500">
            <v-card>
                <v-card-title>
                    <h3> Information utilisateur</h3>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                            label="Nom"
                            placeholder="Placeholder"
                            outlined
                            v-model="name"
                    ></v-text-field>
                    <v-text-field
                            label="Password"
                            placeholder="Placeholder"
                            outlined
                            v-model="password"
                    ></v-text-field>
                    <v-text-field
                            label="E-mail"
                            :rules="[rules.email]"
                            placeholder="Placeholder"
                            outlined
                            type="email"
                            v-model="email"
                    ></v-text-field>
                    <v-text-field
                            label="Code postal"
                            placeholder="Placeholder"
                            :rules="[rules.zip]"
                            outlined
                            v-model="zipCode"
                    ></v-text-field>
                    <v-checkbox
                            v-model="isAdmin"
                            label="Admin"
                    ></v-checkbox>
                </v-card-text>
                <v-card-actions>
                    <v-btn v-if="!edit"
                           @click="save"
                    >
                        Créer
                    </v-btn>
                    <v-btn v-else
                           @click="save"
                    >
                        Modifer
                    </v-btn>

                    <v-btn @click="onClose">
                        close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>

</template>

<script>
  import UserManager from "../UserManager"

  export default {
    name: 'CreateUser',
    data() {
      return {
        id: '',
        name: '',
        email: '',
        password: '',
        zipCode: -1,
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
        userManager: null,
        open: false,
        edit: false
      };
    },
    computed: {
      displayError() {
        if (this.notSaved) return false;
        return !(this.email !== '' && this.zipCode !== -1);
      },
    },
    methods: {
      reset: function () {
        this.name = "";
        this.email = "";
        this.zipCode = -1;
        this.isAdmin = false;
      },
      init: function ( model ) {
        if (model.hasOwnProperty( 'name' ))
          this.name = model.name.get();
        if (model.hasOwnProperty( 'email' ))
          this.email = model.email.get();
        if (model.hasOwnProperty( 'zip' ))
          this.zipCode = model.zip.get();
        if (model.hasOwnProperty( 'isAdmin' ))
          this.isAdmin = model.isAdmin.get();
        if (model.hasOwnProperty( 'password' ))
          this.password = model.password;

        this.id = model.id.get();
        this.edit = true
      },
      opened: function ( option ) {
        if (typeof option === "undefined")
          this.reset();
        else
          this.init( option );

        this.open = true;
      },
      removed: function () {
      },
      closeDialog: function () {

      },
      onClose: function () {
        this.open = false;
      },
      validate() {
        return this.name !== '' && this.email !== '' && this.zipCode !== -1;
      },
      save() {
        this.notSaved = false;
        if (!this.validate()) return;
        if (!this.edit) {

          this.userManager.register( this.name, this.email, this.zipCode,
            this.isAdmin, this.password );
        } else {
          this.userManager.editUser( {
            name: this.name, email: this.email, zip:
            this.zipCode, isAdmin: this.isAdmin, id: this.id, password:
            this.password
          } );
        }
        this.open = false;
      },
    },
    mounted() {
      this.userManager = new UserManager()
    }
  };
</script>

<style scoped>

</style>
