import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th role="columnheader">
              Descrição
            </th>
            <th role="columnheader">
              Tag
            </th>
            <th role="columnheader">
              Método de pagamento
            </th>
            <th role="columnheader">
              Valor
            </th>
            <th role="columnheader">
              Moeda
            </th>
            <th role="columnheader">
              Câmbio utilizado
            </th>
            <th role="columnheader">
              Valor convertido
            </th>
            <th role="columnheader">
              Moeda de conversão
            </th>
            <th role="columnheader">
              Editar/Excluir
            </th>
          </tr>
        </thead>
      </table>
    );
  }
}

export default Table;
