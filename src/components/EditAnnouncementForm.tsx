'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { editAnnouncement } from '@/lib/dbActions';
import { EditAnnouncementSchema } from '@/lib/validationSchemas';
import { Announcement } from '@prisma/client';

type AnnouncementFormData = {
  id: number;
  name: string;
  timeStart: string;
  timeEnd: string;
  date: string;
  location: string;
  description: string;
};

const toDateString = (date: Date) => new Date(date).toISOString().split('T')[0];
const toTimeString = (date: Date) => new Date(date).toISOString().split('T')[1].slice(0, 5);

const onSubmit = async (data: AnnouncementFormData) => {
  await editAnnouncement(data);
  swal('Success', 'Your announcement has been updated', 'success', {
    timer: 2000,
  });
};

const EditAnnouncementForm = ({ announcement }: { announcement: Announcement }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    resolver: yupResolver(EditAnnouncementSchema),
  });

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Announcement</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <input
                        type="text"
                        defaultValue={announcement.name}
                        {...register('name')}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.name?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Date</Form.Label>
                      <input
                        type="date"
                        defaultValue={toDateString(announcement.date)}
                        {...register('date')}
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.date?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Start Time</Form.Label>
                      <input
                        type="time"
                        defaultValue={toTimeString(announcement.timeStart)}
                        {...register('timeStart')}
                        className={`form-control ${errors.timeStart ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.timeStart?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>End Time</Form.Label>
                      <input
                        type="time"
                        defaultValue={toTimeString(announcement.timeEnd)}
                        {...register('timeEnd')}
                        className={`form-control ${errors.timeEnd ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.timeEnd?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <input
                    type="text"
                    defaultValue={announcement.location}
                    {...register('location')}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.location?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <input
                    type="text"
                    defaultValue={announcement.description}
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('id')} value={announcement.id} />
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

export default EditAnnouncementForm;