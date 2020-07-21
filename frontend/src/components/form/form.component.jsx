import React,{useState} from 'react';
import { Form, Upload, Input, Button, Divider,DatePicker, Col, Row, notification, Space } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import fileDownload from 'react-file-download';

import { Collapse } from 'antd';
import { Spin } from 'antd';


const normFile = (e) => {
    // console.log(key);
    // e.file.name = key;
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

const layout = {
    layout: 'vertical'
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 18 },
  };


  
const FormGeneric = () => {
    const [formState, setFormState] = useState({loading:false});
    const formRef = React.createRef();
    const getFile = (number) =>{

        fetch(number===1?"http://e-fact.com.gt:5050/getFile":"http://e-fact.com.gt:5050/getFileAnexo")
        .then(resp => resp.blob())
        .then(resp => {
            fileDownload(resp, number===1?"CartaSolicitud.pdf":"DocAnexo.docx"); //This will download the file in browser.
        })
        .catch(err => console.log(err));
    }
    const openNotificationWithIcon = (type,title,description,reload) => {
        notification[type]({
          message: title,
          description: description,
        });
        if(reload){
            window.location.reload();
        }
        
      };
    const onFinish = async values => {
        
        if(values){
            console.log('Success:', values);
        }
        setFormState({loading: true});
        
        const formData = new FormData();
        ['dpiFile','passportFile','collegiateFile',
        'affidavitFile','applicationLetterFile','attachedFormFile']
        .forEach(key => {
            const newF = new File([values[key][0].originFileObj], `${values.dpi}_${key}.pdf`, {type: 'application/pdf'});
            formData.append("file", newF);
        });
        const request = new XMLHttpRequest();
    
        request.open("POST", "http://e-fact.com.gt:5050/saveFile");
        request.setRequestHeader("enctype", 'multipart/form-data');
        request.setRequestHeader('Authorization', values.dpi);
        request.send(formData);
        request.onload = function(oEvent) {
            if (request.status === 200) {
                console.log("Uploaded!");
                const rp = JSON.parse(request.response);
                console.log(rp);
                
                const paths = {};
                ['dpiFile','passportFile','collegiateFile',
                'affidavitFile','applicationLetterFile','attachedFormFile']
                .forEach(key => {
                    paths[key] = `${values.dpi}_${key}.pdf` || "/";
                });
                const {dpiFile,passportFile,collegiateFile,
                    affidavitFile,applicationLetterFile,attachedFormFile, ...othersValues} = values;
                console.log({ ...paths, ...othersValues});
                fetch('http://e-fact.com.gt:5050/Survey',{
                    method:'post',
                    body: JSON.stringify({code:0, ...paths, ...othersValues}),
                    headers: {'Content-Type': 'application/json'}
                })
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp);
                    setFormState({loading: false});
                    openNotificationWithIcon('success',"Exito","Informacion enviada correctamente, si desea puede enviar un nuevo formulario.",true);
                    
                    
                })
                .catch(err => {
                    setFormState({loading: false});
                    openNotificationWithIcon('error',"Error","Ha ocurrido un error al tratar de enviar tu informacion, por favor intenta de nuevo.",false);

                    console.log(err)
                });
            } else {        
                setFormState({loading: false});
                openNotificationWithIcon('error',"Error","Ha ocurrido un error al tratar de subir tus documentos, por favor intenta de nuevo.",false);

                console.log(request);
                console.log("Error " + request.status + " occurred when trying to upload your file.<br>");
            }
        };

            
        
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        openNotificationWithIcon('error',"Informacion incompleta","Por favor revisa la informacion ingresada, corrobara que has subido todos los documentos.",false);
      };
    return (
    <>
        <Spin tip="Loading..." spinning={formState.loading}>
            <h5>Descargue los siguientes documentos, complete la informacion.</h5>
            <Row>
                <Col span={6}>
                <Space>

                    <Button type="primary" icon={<DownloadOutlined />} size={'middle'} 
                    onClick={()=> getFile(1)} >
                    Carta de Solicitud
                    </Button>

                    <Button type="primary" icon={<DownloadOutlined />}
                    onClick={()=> getFile(2)}
                    size={'middle'}>
                    Doc Anexo
                    </Button>
                </Space>
                
                </Col>
                <Col span={6}>
                    
                </Col>
            </Row>
            <br/><br/>
            <Form
            ref={formRef}
            {...layout}
            name="basic"
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                <Collapse defaultActiveKey={['1']} >
                    <Collapse.Panel header="Informacion Personal" key={1}>
                        <Form.Item
                        label="Primer nombre"
                        name="firstName"
                        rules={[{ required: true, message: 'Por favor ingrese su primer nombre!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Segundo nombre"
                            name="secondName"
                            rules={[{ required: false, message: '' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Otros nombres"
                            name="othersName"
                            rules={[{ required: false, message: '' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Divider dashed />

                        <Form.Item
                            label="Primer Apellido"
                            name="lastName"
                            rules={[{ required: true, message: 'Por favor ingrese su primer apellido!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Segundo Apellido"
                            name="secondLastName"
                            rules={[{ required: false, message: '' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Apellido de Casado(a)"
                            name="marriedSurName"
                            rules={[{ required: false, message: '' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Divider dashed />
                        <Form.Item
                            label="DPI"
                            name="dpi"
                            rules={[{ required: true, message: 'Por favor ingrese su dpi' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="NIT"
                            name="nit"
                            rules={[{ required: false, message: '' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Colegiado"
                            name="collegiate"
                            rules={[{ required: true, message: 'Por favor ingrese su numero de colegiado' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Fecha de nacimiento"
                            rules={[{ required: true, message: 'Por favor ingrese su fecha de nacimiento' }]}
                            style={{
                            display: 'inline-block',
                            }}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            label="Celular"
                            name="telephone"
                            rules={[{ required: true, message: 'Por favor ingrese su telefono' }]}
                        >
                            <Input />
                        </Form.Item>

                        

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                            {
                                type: 'email',
                                message: 'El valor no es un E-mail valido!',
                            },
                            {
                                required: true,
                                message: 'Por favor ingrese su E-mail!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        
                    </Collapse.Panel>
                    <Collapse.Panel header="Documentos" key={2} >

                        <Form.Item
                            name="dpiFile"
                            label="Documento DPI ambos lados"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Subir pdf con foto de ambos lados del dpi"
                            rules={[{ required: true, message: 'Por favor ingrese su dpi' }]}
                        >
                            <Upload name="logo"  listType="picture" accept=".docx, .pdf"
                            >
                            <Button>
                                <UploadOutlined /> Click para subir
                            </Button>
                            </Upload>
                        </Form.Item>
                        <Divider/>
                        <Form.Item

                            name="passportFile"
                            label="Pasaporte en documento pdf"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Subir documento pdf pasaporte"
                            rules={[{ required: true, message: 'Por favor subir imagen de pasaporte en un archivo pdf' }]}
                        >
                            <Upload  name="logo"  listType="picture" accept=".docx, .pdf">
                            <Button>
                                <UploadOutlined /> Click para subir
                            </Button>
                            </Upload>
                        </Form.Item>

                        <Divider/>
                        <Form.Item
                            name="collegiateFile"
                            label="Colegiado en documento pdf"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Subir pdf de la constancia de colegido"
                            rules={[{ required: true, message: 'Por favor suba su constancia de colegido' }]}
                        >
                            <Upload name="logo"  listType="picture" accept=".docx, .pdf">
                            <Button>
                                <UploadOutlined /> Click para subir
                            </Button>
                            </Upload>
                        </Form.Item>
                        <Divider/>
                        <Form.Item
                            name="affidavitFile"
                            label="Documento Acta Notarial"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Subir document pdf del acta notarial"
                            rules={[{ required: true, message: 'Por favor suba documento de acta notarial' }]}
                        >
                            <Upload name="logo"  listType="picture" accept=".docx, .pdf">
                            <Button>
                                <UploadOutlined /> Click para subir
                            </Button>
                            </Upload>
                        </Form.Item>
                        <Divider/>
                        <Form.Item
                            name="applicationLetterFile"
                            label="Documento Carta de Solicitud"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Descargue la Carta de Solicitud, luego subala."
                            rules={[{ required: true, message: 'Por favor suba su Carta de Solicitud' }]}
                        >
                            <Upload name="logo"  listType="picture" accept=".docx, .pdf">
                            <Button>
                                <UploadOutlined /> Click para subir
                            </Button>
                            </Upload>
                        </Form.Item>
                        <Divider/>
                        <Form.Item
                            name="attachedFormFile"
                            label="Documento Anexo"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Descargue el documento anexo, llenelo y subalo"
                            rules={[{ required: true, message: 'Por favor suba su documento anexo' }]}
                        >
                            <Upload name="logo" listType="picture" accept=".docx, .pdf">
                            <Button>
                                <UploadOutlined /> Click para subir
                            </Button>
                            </Upload>
                        </Form.Item>
                        
                        
                        

                        
                    </Collapse.Panel>
                    <br/>
                
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Enviar Informacion
                    </Button>
                </Form.Item>
                <br/><br/>
            </Collapse>

            </Form>
        </Spin>
       
    </>
    );
}

export default FormGeneric;