/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect, useMemo, useState } from 'react';
import styles from './ScheduleRegister.module.css';

import doctorFake from 'repositories/doctorFake.json';
import hoursFake from 'repositories/hoursFake.json';
import priceFake from 'repositories/priceFake.json';
import scheduleFake from 'repositories/scheduleFake.json';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import ReactShadowScroll from 'react-shadow-scroll';

import { MdPlace } from 'react-icons/md';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import IMaskInput from 'react-input-mask';
import * as yup from 'yup';

import Calender from 'components/Calender';
import { useToast } from 'hooks/toast';

interface ICreateScheduleData {
  name: string;
  email: string;
  cpf: string;
}

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório').min(4, 'Nome deve ter no minimo 4 caracteres'),
  email: yup.string().required('Email é obrigatório').email('Digite um e-mail válido'),
  cpf: yup
    .string()
    .required('CPF é obrigatório')
    .matches(/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/, 'Digite um CPF valido'),
});

const ScheduleRegister = () => {
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState('');
  const [address, setAddress] = React.useState('');
  const [isAddress, setIsAddress] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState('');
  const [infoAddress, setInfoAddress] = useState({
    cep: '',
    estado: '',
    cidade: '',
    logradouro: '',
    numero: '',
    latitude: 0,
    longitude: 0,
    bairro: '',
    pais: '',
  });
  const [infoOptions, setInfoOptions] = useState({
    doctor: 0,
    hour: '',
    price: 0,
  });

  const { addToast } = useToast();

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    control,
  } = useForm<ICreateScheduleData>({
    resolver: yupResolver(schema),
  });

  const checkHours = useMemo(() => {
    return scheduleFake.map((schedule, index) => {
      return {
        date: schedule.doctor.date,
        hora: schedule.doctor.hour,
      };
    });
  }, []);

  const validationCheckHours = (value: number) => {
    const res = checkHours.filter((item) => item.date === dateString && item.hora === value);
    if (res.length === 1) {
      return true;
    }
  };

  useEffect(() => {
    setDateString(date.toDateString());
  }, [date]);

  const onChangeCalender = (newDate: SetStateAction<Date>) => {
    setDate(newDate);
  };

  const handleInfoAddressChange = (e: any) => {
    if (e.target.name === 'numero') {
      setTimeout(() => {
        setInfoAddress({
          ...infoAddress,
          [e.target.name]: e.target.value,
        });
      }, 5000);
    } else {
      setInfoAddress({
        ...infoAddress,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleChangeOptions = (e: any) => {
    e.persist();
    setInfoOptions(() => ({
      ...infoOptions,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectAddress = async (value: any) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setSelectedAddress(value);

    if (results[0].address_components.length === 7) {
      const n = results[0].address_components[0].long_name;
      const l = results[0].address_components[1].long_name;
      const b = results[0].address_components[2].long_name;
      const c = results[0].address_components[3].long_name;
      const e = results[0].address_components[4].short_name;
      const p = results[0].address_components[5].long_name;
      const cp = results[0].address_components[6].long_name;

      setInfoAddress({
        ...infoAddress,
        numero: n.toString(),
        logradouro: l,
        bairro: b,
        cidade: c,
        estado: e,
        cep: cp.toString(),
        pais: p,
        longitude: latLng.lng,
        latitude: latLng.lat,
      });
    }

    if (results[0].address_components.length === 6) {
      const l = results[0].address_components[0].long_name;
      const b = results[0].address_components[1].long_name;
      const c = results[0].address_components[2].long_name;
      const e = results[0].address_components[3].short_name;
      const p = results[0].address_components[4].long_name;
      const cp = results[0].address_components[5].long_name;

      setInfoAddress({
        ...infoAddress,
        numero: '',
        logradouro: l,
        bairro: b,
        cidade: c,
        estado: e,
        cep: cp.toString(),
        pais: p,
        longitude: latLng.lng,
        latitude: latLng.lat,
      });
    }

    setIsAddress(true);
  };

  const handleSubmit = (data: any) => {
    if (infoOptions.doctor === 0) {
      addToast({
        type: 'danger',
        title: 'Error',
        description: 'Escolha seu Médico',
        visible: true,
      });
    } else if (infoOptions.hour === '') {
      addToast({
        type: 'danger',
        title: 'Error',
        description: 'Escolha o horario da consulta',
        visible: true,
      });
    }

    if (selectedAddress === '') {
      addToast({
        type: 'danger',
        title: 'Error',
        description: 'Informe seu endereço',
        visible: true,
      });
    }

    const newData = {
      ...data,
      doctor: {
        name: 'Dra. Sandy',
        crm: Number(infoOptions.doctor),
        data: dateString,
        hour: Number(infoOptions.hour),
      },
      address: {
        street: infoAddress.logradouro,
        number: infoAddress.numero,
        district: infoAddress.bairro,
        city: infoAddress.cidade,
        state: infoAddress.estado,
        country: infoAddress.pais,
        long: infoAddress.longitude,
        lat: infoAddress.latitude,
      },
      price: Number(infoOptions.price),
    };

    infoOptions.doctor !== 0 &&
      infoOptions.hour !== '' &&
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Cadastro efetuado',
        visible: true,
      });
  };

  return (
    <div className={styles.schedulesRegisterContainer}>
      <aside>
        <section>
          <h4>Cadastro de consulta</h4>
          <Card className={styles.doctorCard}>
            <Card.Header className="mb-1">
              <span>Escolha o seu Médico</span>
            </Card.Header>
            {doctorFake.map((doctor, index) => (
              <div key={index} className="mb-1">
                <Card.Body className={styles.doctorCardBody}>
                  <Form.Check
                    type="radio"
                    value={doctor.crm}
                    name="doctor"
                    label={`${doctor.name} - CRM: ${doctor.crm}`}
                    onChange={handleChangeOptions}
                  />
                </Card.Body>
              </div>
            ))}
          </Card>
        </section>
        <section>
          <Calender onChange={onChangeCalender} date={date} />
        </section>
        <section className={styles.selectHours}>
          <strong>Escolha o horário</strong>
          <div className={styles.checkContainer}>
            {hoursFake.map((item, index) => (
              <div key={index} className="mb-1">
                <Form.Check
                  key={index}
                  type="radio"
                  name="hour"
                  label={item.name}
                  value={item.value}
                  onChange={handleChangeOptions}
                  disabled={validationCheckHours(item.value)}
                />
              </div>
            ))}
          </div>
        </section>
      </aside>
      <Form onSubmit={onSubmit(handleSubmit)}>
        <Form.Group className="mb-1" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="name" placeholder="Digite seu nome" {...register('name')} />
          <span className={styles.messageError}>{errors?.name?.message}</span>
        </Form.Group>

        <Form.Group className="mb-1" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Digite seu email" {...register('email')} />
          <span className={styles.messageError}>{errors?.email?.message}</span>
        </Form.Group>

        <Form.Group className="mb-1" controlId="formBasicCPF">
          <Form.Label>CPF</Form.Label>
          <Controller
            name="cpf"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Form.Control
                as={IMaskInput}
                placeholder="Digite seu CPF"
                mask="999.999.999-99"
                maskChar=""
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <span className={styles.messageError}>{errors?.cpf?.message}</span>
        </Form.Group>

        <Form.Group className="mb-1">
          <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelectAddress}>
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
              <div>
                <Form.Label>Pesquise pelo seu endereço</Form.Label>
                <Form.Control
                  {...getInputProps({
                    placeholder: 'Buscar ...',
                    className: 'location-search-input',
                  })}
                />

                {!address ? (
                  <div className={styles.addressOptions} />
                ) : (
                  <ReactShadowScroll isShadow={false}>
                    <div className={!isAddress ? styles.addressOptionsContainer : styles.addressOptions}>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion: any, index: any) => {
                        const style = {
                          backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                          borderRadius: '5px',
                          marginRight: '0.75rem',
                        };

                        return (
                          <div
                            key={index}
                            {...getSuggestionItemProps(suggestion, {
                              style,
                            })}
                          >
                            <div className={styles.optionsAddress}>
                              <MdPlace size="18px" color="#11254E" style={{ marginRight: '10px' }} />
                              {suggestion.description} oi
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ReactShadowScroll>
                )}
                <div className={styles.resultAddress}>
                  <MdPlace size="20px" color="#11254E" style={{ marginRight: '10px' }} />
                  <span>{selectedAddress}</span>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </Form.Group>

        <Form.Group className="mb-1">
          {isAddress && infoAddress.cep.length < 8 ? (
            <>
              <Form.Label>Confirme seu CEP</Form.Label>
              <Form.Control
                type="cep"
                name="cep"
                placeholder="Digite seu CEP"
                defaultValue={infoAddress.cep}
                onChange={handleInfoAddressChange}
              />
            </>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-1">
          {isAddress && infoAddress.numero === '' ? (
            <>
              <Form.Label>Confirme o número do logradouro</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                placeholder="Digite o numero do logradouro"
                defaultValue={infoAddress.numero}
                onChange={handleInfoAddressChange}
              />
            </>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-1">
          <Form.Label>Escolha seu Plano</Form.Label>
          <Form.Select aria-label="Default select example" name="price" onChange={handleChangeOptions}>
            {priceFake.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ScheduleRegister;
