import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { cancelSubscription } from "../services/subscriptionService";
import { useLoading } from "../../../hooks/useLoading";

/** Users will cancel their current subscription and be defaulted to the free teir. */
export default function DowngradePage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [isCanceled, setIsCanceled] = useState(false);
    const didRun = useRef(false);

    /** Sends cancellation request to firebase function endpoint. */
    const handleCancellation = async () => {
        if (!currentUser) return;
        await setLoading(true);
        await cancelSubscription(currentUser!);
        setIsCanceled(true);
        await setLoading(false);
    };

    useEffect(() => {
        if (didRun.current) return;
        didRun.current = true;
        handleCancellation();
    }, [currentUser]);

    if (!isCanceled) return <></>;

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
                <div className="card border-0 shadow overflow-hidden">
                    <div className="bg-warning-subtle p-4 text-center position-relative">
                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning text-dark" style={{ width: 64, height: 64 }}>
                            <i className="bi bi-arrow-down-circle fs-2" aria-hidden="true" />
                        </div>
                        <h1 id="downgrade-title" className="h3 fw-bold mt-3 mb-1">
                            You're now on the Free plan
                        </h1>
                        <p className="mb-0 text-warning-emphasis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda saepe dolorem nesciunt deserunt.</p>
                    </div>
                    <div className="card-body p-4 p-md-5">
                        <div className="border rounded-3 p-3 p-md-4 mb-4">
                            <h2 className="h6 fw-bold mb-2">Upgrade again anytime</h2>
                            <p className="mb-3 text-body-secondary">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus voluptatibus doloremque ullam sint fuga est totam repellat officiis hic voluptates..</p>
                            <div className="d-flex flex-wrap gap-2">
                                <button className="btn btn-primary" onClick={() => navigate("/payment/2")} aria-label="Upgrade to Pro">
                                    Upgrade to Pro
                                </button>
                                <button className="btn btn-outline-primary" onClick={() => navigate("/")} aria-label="Go Home">
                                    Go Home
                                </button>
                            </div>
                        </div>
                        <div className="alert alert-light border d-flex align-items-center gap-2" role="status">
                            <i className="bi bi-info-circle" aria-hidden="true" />
                            <div className="small">You can upgrade at any time. Billing starts from the moment you upgrade.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
