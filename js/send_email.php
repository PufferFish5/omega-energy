<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
    $lastName  = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
    $phone     = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $email     = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $location  = filter_input(INPUT_POST, 'location', FILTER_SANITIZE_STRING);
    $message   = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    if (empty($firstName) || empty($lastName) || empty($phone) || empty($email) || empty($location) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Fill all fields.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Wrong Email.']);
        exit;
    }

    $toUser      = $email;
    $subjectUser = 'Thank you for your referral to Omega Energy!';
    $messageUser = "{$firstName} {$lastName},\n\n"
                 . "Thank you for contacting Omega Energy. We have received your message and will contact you shortly.\n\n"
                 . "Omega Energy loves you";

    $headersUser = 'From: "Omega Energy" <omega-energy@omega-energy.zzz.com.ua>' . "\r\n" .
                   'Reply-To: omega-energy@omega-energy.zzz.com.ua' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

    $autoReplySent = false;

    if (mail($toUser, $subjectUser, $messageUser, $headersUser)) {
        $autoReplySent = true;
    } else {
        error_log("Failed to send message to a: " . $toUser);
    }

    if ($autoReplySent) {
        echo json_encode(['success' => true, 'message' => 'otvet otpravil, chekay.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'otvet ne otpravil, sorry.']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'error.']);
}

?>
