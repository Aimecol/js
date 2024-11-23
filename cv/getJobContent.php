<?php
$job = $_GET['job'];
$content = [
    "marketingManager" => "Develop, implement, and oversee comprehensive marketing strategies to drive brand awareness, customer acquisition, and revenue growth. Conduct thorough market research to identify customer needs, preferences, and trends.",
    "salesExecutive" => "Identify and prospect potential clients through research, cold calling, networking, and referrals. Build and nurture strong client relationships to understand their needs and deliver tailored solutions."
];

echo isset($content[$job]) ? $content[$job] : "Job content not found.";
