<template>

  <ui-grid class="head-grid">
    <ui-grid-cell class="demo-cell" columns="12">
      <ui-form-field>
        <h1>Rezept Name</h1> <!--Variable ersetzen-->
      </ui-form-field>
    </ui-grid-cell>
  </ui-grid>



  <ui-grid class="bildUndListe">
    <ui-grid-cell class="bild" columns="4">
      <ui-form-field>
        <div class="bild">
          <img src="../assets/essen_dummy.jpg" alt="Bild konnte nicht geladen werden."><!--Variable ersetzen-->
        </div>
      </ui-form-field>
    </ui-grid-cell>

    <ui-grid-cell class="liste" columns="6">
      <h2>Zutaten Liste:</h2>
      <ui-list :type="3">
        <ui-item v-for="i in 5" :key="i"><!--10 durch Variable ersetzen-->
          <ui-item-text-content>
            <ui-item-text1>Zutat</ui-item-text1> <!--Variable ersetzen-->
            <ui-item-text2>Menge</ui-item-text2> <!--Variable ersetzen-->
          </ui-item-text-content>
        </ui-item>
      </ui-list>
    </ui-grid-cell>

    <ui-grid-cell class="leer" columns="2">
    </ui-grid-cell>
  </ui-grid>




  <ui-grid class="bewertungUndNutriUndAnleitung">
    <ui-grid-cell class="bewertung" columns="3">
      <ui-icon-button v-model="value1" :toggle="icon1"> </ui-icon-button>
      <ui-icon-button v-model="value2" :toggle="icon1"> </ui-icon-button>
      <ui-icon-button v-model="value3" :toggle="icon1"> </ui-icon-button>
      <ui-icon-button v-model="value4" :toggle="icon1"> </ui-icon-button>
      <ui-icon-button v-model="value5" :toggle="icon1"> </ui-icon-button>
    </ui-grid-cell>

    <ui-grid-cell class="nutri" columns="2">

    </ui-grid-cell>

    <ui-grid-cell class="anleitung" columns="5">
      <h2>Anleitung:</h2><!--muss geladen werden-->
      PlatzhalterText
    </ui-grid-cell>

    <ui-grid-cell class="leer" columns="2">
    </ui-grid-cell>
  </ui-grid>




 <ui-grid class="kommentare">
   <ui-grid-cell class="schreiben" columns="6">
     <ui-textfield input-type="textarea" rows="20" cols="120">
       Schreiben Sie einen Kommentar.
     </ui-textfield>
   </ui-grid-cell>

   <ui-grid-cell class="lesen" columns="6">
     Andere Kommentare <!--einlesen-->
   </ui-grid-cell>
 </ui-grid>


</template>






<script>
export default {
  name: "rezeptDummy",


    data() {
      return {
        value1: false,
        value2:false,
        value3:false,
        value4: false,
        value5:false,
        icon1: {
          on: 'star',
          off: 'star_border'
        },
      };
    }




};



</script>






<style scoped>

.bild img {
  height: auto;
  width: 50%;
  object-fit: cover;
}

.bewertung{
 border: 4px solid goldenrod;
}


</style>