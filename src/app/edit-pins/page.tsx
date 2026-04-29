import { Button, Container, Form } from 'react-bootstrap';
import { getPins, removePin, updatePin } from '@/lib/dbActions';

export const dynamic = 'force-dynamic';

const EditPinsPage = async () => {
  const pins = await getPins();

  return (
    <Container className="py-5">
      <style>
        {`
          .custom-green-btn {
            background-color: #4a7c4a;
            border-color: #4a7c4a;
            color: white;
          }

          .custom-green-btn:hover {
            background-color: #7aad6e;
            border-color: #7aad6e;
          }
        `}
      </style>
      <h1 className="fw-bold mb-3">Edit Pins</h1>
      <p className="mb-4">
        Update existing recycling pins or remove them from the map.
      </p>

      {pins.map((pin) => (
        <Form
          key={pin.id}
          id={`pin-${pin.id}`}
          className="border rounded p-3 mb-4"
        >
          <input type="hidden" name="id" value={pin.id} />

          <div className="mb-3">
            <label htmlFor={`latitude-${pin.id}`} className="form-label">
              Latitude
            </label>
            <input
              id={`latitude-${pin.id}`}
              type="number"
              step="any"
              name="latitude"
              defaultValue={pin.latitude}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor={`longitude-${pin.id}`} className="form-label">
              Longitude
            </label>
            <input
              id={`longitude-${pin.id}`}
              type="number"
              step="any"
              name="longitude"
              defaultValue={pin.longitude}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor={`name-${pin.id}`} className="form-label">
              Building Name
            </label>
            <input
              id={`name-${pin.id}`}
              type="text"
              name="name"
              defaultValue={pin.name}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor={`description-${pin.id}`} className="form-label">
              Location Description
            </label>
            <textarea
              id={`description-${pin.id}`}
              name="description"
              defaultValue={pin.description}
              required
              rows={3}
              className="form-control"
            />
          </div>

          <Button
            type="submit"
            className="me-2 custom-green-btn"
            formAction={async (formData: FormData) => {
              'use server';

              const id = Number(formData.get('id'));
              const latitude = parseFloat(formData.get('latitude') as string);
              const longitude = parseFloat(formData.get('longitude') as string);
              const name = formData.get('name') as string;
              const description = formData.get('description') as string;

              await updatePin({
                id,
                latitude,
                longitude,
                name,
                description,
              });
            }}
          >
            Save
          </Button>

          <Button
            type="submit"
            variant="danger"
            formAction={async (formData: FormData) => {
              'use server';

              const id = Number(formData.get('id'));
              await removePin(id);
            }}
          >
            Remove Pin
          </Button>
        </Form>
      ))}
    </Container>
  );
};

export default EditPinsPage;
