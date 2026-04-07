import { Container, Image } from 'react-bootstrap';

const FindBinPage = () => {
  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-3">Find a Bin</h1>

      <p className="mb-4">
        This page will be where users can either select directions to a specific
        bin or press a button to find the nearest bin to their current location.
      </p>

      <Image
        src="/img/bin_finder.png"
        alt="UH Mānoa campus map"
        width={1200}
        height={800}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      />
    </Container>
  );
};

export default FindBinPage;
