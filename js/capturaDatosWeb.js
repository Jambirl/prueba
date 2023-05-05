/*
https://www.rfebm.com/competiciones/competicion.php?seleccion=0&id=1012870&jornada=14&id_ambito=0#
https://www.rfebm.com/competiciones/competicion.php?seleccion=0&id=1012870&jornada=13&id_ambito=0

Liga Femenina
2016
1: https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=6123
2:
  Grupo A: https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=6172
  Grupo B: https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=6173
  Grupo C: https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=6174
  Grupo D: https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=6175
  Eliminatorias: https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=6463
  Grupo ascenso: https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=6485
2017
https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=7724
2018
https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=1000299
2019
https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=1001824
*/
function capturaDatosWeb() {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://www.rfebm.com/competiciones/resultados_completos.php?seleccion=0&id=6123');
  request.send();
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const html = this.responseText;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const rows = doc.querySelectorAll('table tr');
      const results = [];
      for (let i = 2; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td');
        const match = {
          date: cells[0].textContent.trim(),
          time: cells[1].textContent.trim(),
          homeTeam: cells[2].querySelector('a').textContent.trim(),
          homeScore: cells[3].textContent.trim(),
          awayScore: cells[5].textContent.trim(),
          awayTeam: cells[6].querySelector('a').textContent.trim()
        };
        results.push(match);
      }
      console.log(results);
    }
  }
}