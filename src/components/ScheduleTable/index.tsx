import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { MdDeleteForever, MdInfo } from 'react-icons/md';

interface IScheduleTableProps {
  options: [
    {
      name: string;
      email: string;
      cpf: string;
      doctor: {
        name: string;
        crm: number;
        date: string;
        hour: number;
      };
      address: {
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        country: string;
        long: string;
        lat: string;
      };
      price: number;
    }
  ];
}

const ScheduleTable: React.FC<IScheduleTableProps> = ({ options }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Cliente</th>
          <th scope="col">Endereço</th>
          <th scope="col">Consulta</th>
          <th scope="col">Preço</th>
          <th scope="col">Ações</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <>
          {options &&
            options.map((schedule, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="user-default.png"
                      alt=""
                      style={{ width: '45px', height: '45px' }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{schedule.name}</p>
                      <p className="text-muted mb-0">{schedule.email}</p>
                      <p className="text-muted mb-0">{schedule.cpf}l</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-0">
                    {schedule.address.street} - {schedule.address.number}
                  </p>
                  <p className="text-muted mb-0">
                    {schedule.address.district},{schedule.address.city},
                  </p>
                  <p className="text-muted mb-0">
                    {schedule.address.state},{schedule.address.country},
                  </p>
                </td>
                <td>
                  <p className="fw-bold mb-0"> {schedule.doctor.name}</p>
                  <p className="text-muted mb-0"> {schedule.doctor.date}</p>
                </td>
                <td>
                  <p> {schedule.price}</p>
                </td>
                <td>
                  <a href="#">
                    <MdInfo size={24} color="#4CD62B" />
                  </a>
                  <a href="#">
                    <MdDeleteForever size={24} color="#E83F5B" />
                  </a>
                </td>
              </tr>
            ))}
        </>
      </MDBTableBody>
    </MDBTable>
  );
};

export default ScheduleTable;
