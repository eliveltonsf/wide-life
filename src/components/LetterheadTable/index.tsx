/* eslint-disable @typescript-eslint/no-explicit-any */
import { MDBCheckbox, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import letterheadFake from 'repositories/letterheadFake.json';

interface ILetterheadTableProps {
  options?: [
    {
      name: string;
      type: string;
      description: string;
      status: string;
    }
  ];
}

const LetterheadTable: React.FC<ILetterheadTableProps> = ({ options }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead light>
        <tr>
          <th scope="col">
            <MDBCheckbox></MDBCheckbox>
          </th>
          <th scope="col">Title</th>
          <th scope="col">Tipo</th>
          <th scope="col">Descrição</th>
          <th scope="col">status</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <>
          {letterheadFake.map((letterhead, index) => (
            <tr key={index}>
              <td>
                <th scope="col">
                  <MDBCheckbox></MDBCheckbox>
                </th>
              </td>
              <td>
                <p className="fw-bold mb-0"> {letterhead.name}</p>
              </td>
              <td>
                <p className="fw-bold mb-0"> {letterhead.type}</p>
              </td>
              <td>
                <p className="fw-bold mb-0"> {letterhead.description}</p>
              </td>
              <td>
                <p className="fw-bold mb-0"> {letterhead.status}</p>
              </td>
            </tr>
          ))}
        </>
      </MDBTableBody>
    </MDBTable>
  );
};

export default LetterheadTable;
