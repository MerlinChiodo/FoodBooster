<template>
  <h1>Admin Bereich: Meldungen</h1>
  <ui-list>
    <ui-item v-for="(meldung, index) in meldungen" :key="meldung.index">
      <ui-item-text-content>{{ index + 1 }}. Meldung | MeldungsId: {{ meldung.MELDUNGSID }} | Gemeldeter:
        {{ meldung.GEMELDETER }} | Grund: {{ meldung.GRUND }}
      </ui-item-text-content>
      <ui-item-last-content>
        <ui-icon @click="deleteMeldung(meldung.MELDUNGSID)">delete</ui-icon>
      </ui-item-last-content>
    </ui-item>
  </ui-list>

</template>

<script>
import http from "@/http-common";

export default {
  name: "AdminMeldungen",


  data() {
    return {
      MELDUNGSID: "",
      GEMELDETER: "",
      GRUND: "",

      meldungen: [],

    }
  },
  async mounted() {
    // GET request using axios with async/await
    const response = await http.get("meldung/");
    this.meldungen = response.data;
  },
  methods: {
    async deleteMeldung(MELDUNGSID) {
      const response = await http.delete("meldung/", {
        headers: {
          "x-access-token": "token-value",
        },
        data: {
          Meldung_ID: MELDUNGSID,
        }
      });
      console.log(response);
      // setTimeout(() => this.isHidden = false, 500);
      // this.$forceUpdate();
    },
  }

}
</script>

<style lang="scss" scoped>

h1 {
  padding: 20px;
  text-align: center;
}

h3 {
  padding: 20px;
  text-align: center;
}

ul {
  list-style-type: none;
}

</style>
