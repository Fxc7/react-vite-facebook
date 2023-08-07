import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button, Card, Row, Col } from 'react-bootstrap';
import { FaSquareFacebook } from 'react-icons/fa6';
import { Toaster, toast } from 'sonner';

import { cols, name_site, proxy } from '../../configs.js';

const ContentComponent = () => {
    const [url, setUrl] = useState('');
    const [display, setDisplay] = useState('d-none');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSetAll = () => {
        setUrl('');
        setDisplay('d-none');
        setLoading(false);
    };

    const handleKeypress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleFetch = async (link) => {
        try {
            const response = await fetch(`${proxy}/one/facebook/${link}`).then(response => response.json());
            if (response.success || response.status) {
                const results = {};
                results.title = response.title;
                results.author_name = response.author_name;
                results.duration = response.duration;
                results.thumbnail = response.thumbnail;
                results.hd = response.hd;
                results.sd = response.sd;
                setResult(results);
                setDisplay('d-block');
                setLoading(false);
                toast.success('Successfully...');
            } else {
                toast.error('Error while getting data...');
                setDisplay('d-none');
                setLoading(false);

            }
        } catch (error) {
            toast.error('Error while fetching videos...');
            handleSetAll();
        }
    }

    useEffect(() => {
        if (url) {
            handleFetch(url);
        }
    }, [url]);

    const handleSubmit = () => {
        const url = document.querySelector('input').value;
        if (!url) {
            toast.error('Please input a url...');
        } else if (/https?:\/\/(web\.|www\.|m\.|)?(facebook|fb)\.(com|watch|gg)\S+/i.test(url)) {
            // eslint-disable-next-line
            setLoading(true);
            setUrl(url);
            document.querySelector('input').value = '';
        } else {
            document.querySelector('input').value = '';
            toast.error('Invalid URL, please provide a valid URL...');
        }
    }

    return (
        <main className="py-5 mb-5">
            <Toaster position="top-center" richColors />
            <Container>
                <Row className={display + " content-result justify-content-center"}>
                    {
                        result ? <Col className="text-center">
                            <Card className="bg-transparent">
                                {
                                    result?.thumbnail && result?.title ? <Card.Img variant="top" src={result.thumbnail.replaceAll('&amp;', '&')} alt={result.title}></Card.Img> : null
                                }
                                {
                                    result?.title ? <Card.Title className="pt-4 px-2 fw-bold text-truncate">{result.title}</Card.Title> : null
                                }
                                <Card.Body className="fw-bold text-muted">
                                    {
                                        result?.author_name ? <p>{result?.author_name}</p> : null
                                    }
                                    {
                                        result?.duration ? <p className="pt-1">{result.duration}</p> : null
                                    }
                                    {
                                        result?.hd ? <button className="btn btn-danger fw-bold text-muted" onClick={() => {
                                            window.open(result.hd.replaceAll('&amp;', '&'), '_blank');
                                        }}>Video HD</button> : null}
                                    {' '}
                                    {
                                        result?.sd ? <button className="btn btn-danger fw-bold text-muted" onClick={() => {
                                            window.open(result.sd.replaceAll('&amp;', '&'), '_blank');
                                        }}>Video SD</button> : null
                                    }
                                </Card.Body>
                            </Card>
                        </Col> : null
                    }
                </Row>
                <Row className="content-download justify-content-center">
                    <Col sm className="py-4 my-5">
                        <FaSquareFacebook size={200} />
                        <input type="url" placeholder="facebook url..." className="btn btn-lg bg-transparent btn-outline-danger mt-4 color-default" onKeyPress={handleKeypress} />
                        <Button variant="none" disabled={loading} className="btn btn-lg mt-3" onClick={handleSubmit}>{loading ? (
                            <span>
                                <Spinner size="sm" animation="grow" variant="light" /> Loading...
                            </span>
                        ) : 'submit'}</Button>
                        <p className="pt-4 mb-1 fw-bold text-center text-muted">Free Download online video Facebook</p>
                    </Col>
                </Row>
                <Row className="content-features py-3 my-5 text-center">
                    <Col>
                        <h1 className="fw-bold">Why you should use that {name_site} provides</h1>
                        <p className="font-small text-muted">
                            <span className="fw-bold">{name_site}</span> is more than just a Facebook video downloader built with cutting edge technology. But there are also some other features that are very useful for users.
                        </p>
                    </Col>
                    <hr />
                    <Col>
                        {
                            cols.map((element) => (
                                <Card data-aos={element.animate} key={element.id} className="py-2 mt-3 bg-transparent text-center align-items-center">
                                    <element.icon size={55} />
                                    <Card.Title className="fw-bold">{element.title}</Card.Title>
                                    <Card.Body className="font-small text-muted">{element.description}</Card.Body>
                                </Card>
                            ))
                        }
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default ContentComponent;