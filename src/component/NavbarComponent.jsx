import { Navbar, Container } from 'react-bootstrap';
import { FaFacebookSquare } from 'react-icons/fa';

import { navbar_title } from '../../configs.js';

const NavbarComponent = () => {
    return (
        <Navbar>
            <Container className="animate__animated animate__fadeIn">
                <Navbar.Brand>
                    <FaFacebookSquare size={55}/>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="fw-bold font-xx-large font-cherry">
                        {navbar_title}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default NavbarComponent;