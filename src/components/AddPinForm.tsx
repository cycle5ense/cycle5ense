'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addPin } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddPinSchema } from '@/lib/validationSchemas';
import { Building } from '@prisma/client';

const onSubmit = async (data: {
  location: Building,
  floor: number,
  description: string, }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addPin(data);
  swal('Success', 'Your pin has been added', 'success', {
    timer: 2000,
  });
};

const AddPinForm: React.FC = () => {
  const { status } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddPinSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Add Pin</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <select {...register('location')} className={`form-control ${errors.location ? 'is-invalid' : ''}`}>
                      <option value="Outside">Outside</option>
                      <option value="CampusCenter">Campus Center</option>
                      <option value="ArtBuilding">Art Building</option>
                      <option value="HolmesHall">Holmes Hall</option>
                      <option value="KraussHall">Krauss Hall</option>
                      <option value="POST">POST</option>
                      <option value="MarineScienceBuilding">Marine Science Building</option>
                      <option value="UniversityHealthServices">University Health Services</option>
                      <option value="KennedyTheatre">Kennedy Theatre</option>
                      <option value="KellerHall">Keller Hall</option>
                      <option value="WatanabeHall">Watanabe Hall</option>
                      <option value="HawaiiInstituteGeophysics">Hawaii Institute of Geophysics</option>
                      <option value="PhysicalScienceBuilding">Physical Science Building</option>
                      <option value="InformationTechnologyCenter">Information Technology Center</option>
                      <option value="BilgerHall">Bilger Hall</option>
                      <option value="BilgerAddition">Bilger Addition</option>
                      <option value="SakamakiHall">Sakamaki Hall</option>
                      <option value="KuykendallHall">Kuykendall Hall</option>
                      <option value="KuykendallAnnex">Kuykendall Annex</option>
                      <option value="Building37">Building 37</option>
                      <option value="MillerHall">Miller Hall</option>
                      <option value="WarriorRecreationCenter">Warrior Recreation Center</option>
                      <option value="AdminServicesBuilding1">Admin Services Building 1</option>
                      <option value="AdminServicesBuilding2">Admin Services Building 2</option>
                      <option value="HemmenwayHall">Hemmenway Hall</option>
                      <option value="BachmanHall">Bachman Hall</option>
                      <option value="DeanHall">Dean Hall</option>
                      <option value="GartleyHall">Gartley Hall</option>
                      <option value="FutureStudentSuccessCenter">Future Student Success Center</option>
                      <option value="ArchitectureBuilding">Architecture Building</option>
                      <option value="AndrewsOutdoorTheatre">Andrews Outdoor Theatre</option>
                      <option value="HawaiiHall">Hawaii Hall</option>
                      <option value="LifeSciencesBuilding">Life Sciences Building</option>
                      <option value="MooreHall">Moore Hall</option>
                      <option value="ParadisePalms">Paradise Palms</option>
                      <option value="HamiltonLibrary">Hamilton Library</option>
                      <option value="HamiltonLibraryAddition">Hamilton Library Addition</option>
                      <option value="EdmondsonHall">Edmondson Hall</option>
                      <option value="SpaldingHall">Spalding Hall</option>
                      <option value="WebsterHall">Webster Hall</option>
                      <option value="QueenLiliuokalaniCenterforStudentServices">Queen Liliuokalani Center for Student Services</option>
                      <option value="SaundersHall">Saunders Hall</option>
                      <option value="CrawfordHall">Crawford Hall</option>
                      <option value="BusinessAdministrationBuilding">Business Administration Building</option>
                      <option value="GeorgeHall">George Hall</option>
                    </select>
                    <div className="invalid-feedback">{errors.location?.message}</div>
                  </Form.Group>
                  </Col>
                  <Col>
                  <Form.Group>
                  <Form.Label>Floor</Form.Label>
                  <input
                    type="number"
                    {...register('floor')}
                    className={`form-control ${errors.floor ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.floor?.message}</div>
                </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    type="text"
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPinForm;
