import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-orange-800 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Login
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <div className="pb-5 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-2 text-sm text-gray-500">Effective Date: December 17, 2025</p>
          </div>
          
          <div className="py-5 space-y-6 text-gray-700">
           <div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p>TravelBuddyCore.INC (&#8220;<b>TravelBuddyCore</b>,&#8221; &#8220;<b>we</b>,&#8221; &#8220;<b>us</b>,&#8221; or &#8220;<b>our</b>&#8221;) is a company duly <br/>incorporated and operating exclusively within the jurisdiction of Nepal, with primary offices <br/>located in Kathmandu and Pokhara. We are committed to safeguarding your privacy and <br/>protecting the integrity, confidentiality, and security of your personal data in accordance with the <br/><b>Individual Privacy Act, 2018 (Nepal)</b> (&#8220;IP Act&#8221;) and other applicable Nepalese laws. <br/></p>
<p>This <b>Privacy Policy</b> (&#8220;<b>Policy</b>&#8221;) outlines how we collect, use, process, retain, transfer, disclose, <br/>and protect personal data when you access or use our digital services, including our website, <br/>mobile applications, APIs, and any related online or offline services we offer (collectively, the <br/>&#8220;<b>Platform</b>&#8221;). <br/></p>
<p>This Policy is hereby <b>incorporated by reference into our Terms &amp; Conditions</b>, which together <br/>constitute a binding agreement governing your relationship with TravelBuddyCore. By accessing <br/>or using the Platform, you confirm that you have read, understood, and agreed to be bound by <br/>this Policy in its entirety. If you <b>do not agree</b> with any part of this Policy, you must <b>immediately <br/>cease all access to and use of the Platform</b>. <br/></p>
<p>We process all personal data exclusively in accordance with the applicable laws of Nepal, and <br/>we do not claim extraterritorial compliance with foreign privacy regulations unless expressly <br/>stated within this Policy. However, where technically feasible and voluntarily adopted as best <br/>practices, we may adhere to global data protection standards that enhance user rights and data <br/>integrity, provided such adherence does not conflict with Nepalese law. <br/></p>
<p><b>1. Definitions <br/>For the purposes of this Privacy Policy and in accordance with the Individual Privacy Act, <br/>2018 (Nepal) (&#8220;IP Act&#8221;), as well as accepted global data protection norms where <br/>consistent with Nepalese law, the following definitions shall apply: <br/>1.1 Personal Data <br/>&#8220;Personal Data&#8221; means any information relating to a natural person who is identified or <br/>identifiable, directly or indirectly. Examples include but are not limited to: <br/></b></p>
<p><b>&#9679;&#8203; Name, gender, nationality, or date of birth;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; National ID number, passport, driver&#8217;s license, or voter ID;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Contact details (phone number, postal address, email address);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Digital identifiers (IP address, cookie ID, device ID);&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Geolocation data and travel history;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Photographic or video likeness where identification is possible;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Any combination of data elements that can reasonably lead to identification.&#8203;<br/> <br/></b></p>
<p><b>Ref: IP Act, Section 2(g). <br/>1.2 Sensitive Personal Data <br/>&#8220;Sensitive Personal Data&#8221; refers to Personal Data that, if misused, may cause serious <br/>harm or discrimination to the Data Subject. Under the IP Act, it includes: <br/></b></p>
<p><b>&#9679;&#8203; Religious or caste identity;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Political opinions or party affiliation;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Health status or medical history;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Biometric and genetic information;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Sexual behavior or orientation;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Financial status, income, or account details;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Any other category defined as sensitive by law or regulatory guidelines.&#8203;<br/> <br/></b></p>
<p><b>Ref: IP Act, Section 2(h); subject to mandatory explicit, informed consent before <br/>Processing. <br/>1.3 Non-Personal Data <br/>&#8220;Non-Personal Data&#8221; refers to data that has been anonymized, aggregated, or otherwise <br/>rendered incapable of identifying an individual, either by itself or in combination with <br/>other datasets. Examples: <br/></b></p>
<p><b>&#9679;&#8203; Usage statistics;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Generic device metrics;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Aggregated travel preferences.&#8203;<br/> <br/></b></p>
<p><b>Note: If such data can be reasonably re-identified, it shall be considered Personal Data. </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>1.4 Processing <br/>&#8220;Processing&#8221; encompasses any operation or set of operations performed on Personal <br/>Data. This includes: <br/></b></p>
<p><b>&#9679;&#8203; Collection, recording, organization, structuring;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Storage, adaptation, or alteration;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Retrieval, consultation, use;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Disclosure, dissemination, or transmission;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Alignment, combination, restriction, erasure, or destruction.&#8203;<br/> <br/></b></p>
<p><b>Ref: IP Act, Section 2(k). <br/>1.5 Data Subject <br/>&#8220;Data Subject&#8221; means a living natural person&#8212;whether a citizen or resident of <br/>Nepal&#8212;whose Personal Data is collected, stored, or processed by TravelBuddyCore.INC. <br/>1.6 Data Controller <br/>&#8220;Data Controller&#8221; means the entity that determines the purposes and means of <br/>Processing Personal Data. Here, TravelBuddyCore.INC, with its registered office in <br/>Pokhara/Kathmandu, is the Data Controller. <br/>1.7 Data Processor <br/>&#8220;Data Processor&#8221; means any third party who processes Personal Data on behalf of the <br/>Data Controller under a valid and binding data processing agreement. Examples: <br/></b></p>
<p><b>&#9679;&#8203; Cloud hosting services;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Payment gateways;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Analytics or email marketing providers.&#8203;<br/> <br/></b></p>
<p><b>Processors are subject to confidentiality and security obligations. <br/>1.8 Consent </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#8220;Consent&#8221; means any voluntary, specific, informed, and unambiguous expression of the <br/>Data Subject&#8217;s will&#8212;either through written, digital, or verbal means&#8212;by which they agree <br/>to the Processing of their Personal Data. For Sensitive Personal Data, consent must be <br/>explicit, prior, and separately highlighted. <br/>Consent is revocable at any time without retroactive effect on lawful prior Processing. <br/>Ref: IP Act, Sections 3, 4, and 5. <br/>1.9 Breach of Personal Data <br/>&#8220;Breach of Personal Data&#8221; refers to any confirmed or suspected incident of unauthorized <br/>access, disclosure, alteration, loss, theft, or destruction of Personal Data&#8212;accidental or <br/>deliberate&#8212;that compromises confidentiality, integrity, or availability. <br/>Ref: IP Act, Section 19(1). <br/>1.10 Anonymization <br/>&#8220;Anonymization&#8221; means a one-way process by which Personal Data is irreversibly <br/>modified such that no individual can be identified, directly or indirectly, by any party, <br/>using reasonable technical or legal means. <br/>Anonymized data falls outside the scope of the IP Act unless reverse engineering is <br/>possible. <br/>1.11 Third Party <br/>&#8220;Third Party&#8221; means any individual, legal person, authority, or other body other than the <br/>Data Subject, Data Controller, or authorized Data Processor, that may receive or interact <br/>with Personal Data under a lawful basis (e.g., travel partners, courts, regulators). <br/>Third Parties must process data under legal obligation or with consent, and may not use <br/>Personal Data beyond the stated purpose. <br/>1.12 Profiling <br/>&#8220;Profiling&#8221; means any automated Processing of Personal Data intended to analyze, <br/>evaluate, or predict aspects of a Data Subject&#8217;s behavior, preferences, location, <br/>economic situation, interests, reliability, or movements. <br/>Profiling is permitted under Nepalese law only if: <br/></b></p>
<p><b>&#9679;&#8203; The Data Subject has been informed;&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; It is not used to make legal or similarly significant decisions without human <br/>oversight;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Consent has been obtained where required.&#8203;<br/> <br/></b></p>
<p><b>1.13 Automated Decision-Making <br/>&#8220;Automated Decision-Making&#8221; refers to decisions made solely by algorithmic or AI-based <br/>systems without human intervention that produce legal effects or significantly affect the <br/>Data Subject (e.g., risk scoring, denial of service). <br/>Where such processing is implemented: <br/></b></p>
<p><b>&#9679;&#8203; It shall be transparent, auditable, and contestable;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The Data Subject shall be informed of the logic and consequences;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Human review mechanisms shall be in place for recourse or appeal.&#8203;<br/> <br/></b></p>
<p><b>2. Scope and Legal Framework <br/>2.1 Geographic and Jurisdictional Scope <br/>This Privacy Policy governs the collection, use, disclosure, transfer, storage, and <br/>protection of Personal Data by TravelBuddyCore.INC, a company incorporated and <br/>registered under the laws of Nepal, with operational headquarters in Pokhara and/or <br/>Kathmandu. This Policy applies to all individuals who: <br/></b></p>
<p><b>&#9679;&#8203; Access or use our website, mobile applications, APIs, or affiliated services (the <br/>&#8220;Platform&#8221;);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Interact with our customer support, submit inquiries, or participate in surveys or <br/>promotions;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Book or inquire about travel-related products or services through our Platform;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Are Data Subjects under Nepalese law whose data is collected, stored, or <br/>processed within or outside Nepal.&#8203;<br/> <br/></b></p>
<p><b>This Policy is binding upon users regardless of their location, to the extent permissible <br/>under applicable laws. <br/>2.2 Applicable Legal Instruments </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>We are primarily governed by the laws of Nepal, including but not limited to: <br/>&#9679;&#8203; Individual Privacy Act, 2075 (2018) &#8211; the principal data protection statute of Nepal;&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Electronic Transactions Act, 2063 (2008) &#8211; for digital authentication and <br/></b></p>
<p><b>cybercrime;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Consumer Protection Act, 2075 (2018) &#8211; with respect to fair information practices.&#8203;<br/> <br/></b></p>
<p><b>In cases involving cross-border data flows or foreign users, we voluntarily adhere to <br/>international data protection standards where applicable and not in conflict with Nepali <br/>law, including: <br/></b></p>
<p><b>&#9679;&#8203; EU General Data Protection Regulation (GDPR) &#8211; for EU-based users;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; California Consumer Privacy Act and California Privacy Rights Act (CCPA/CPRA) &#8211; <br/>for California-based users;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; India&#8217;s Digital Personal Data Protection Act, 2023 (DPDP Act) &#8211; for users in India;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Brazil&#8217;s General Data Protection Law (LGPD) &#8211; for Brazilian users;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Canada&#8217;s Personal Information Protection and Electronic Documents Act <br/>(PIPEDA) &#8211; for Canadian residents.&#8203;<br/> <br/></b></p>
<p><b>These instruments are only applied insofar as: <br/>1.&#8203; They do not contradict the Individual Privacy Act, 2018, and&#8203;<br/></b></p>
<p><b> <br/>2.&#8203; They are necessary for cross-border data transfers, platform accessibility, or legal <br/></b></p>
<p><b>compliance with applicable foreign jurisdictions.&#8203;<br/> <br/></b></p>
<p><b>2.3 Higher Standard of Protection <br/>Where multiple laws apply and diverge, TravelBuddyCore.INC shall apply the standard <br/>that affords the greatest level of protection to the Data Subject, unless a conflicting and <br/>mandatory provision of Nepalese law prohibits such elevation. <br/>2.4 Scope of Data Processing Activities <br/>This Policy applies to all Processing activities performed by TravelBuddyCore.INC, <br/>including but not limited to: </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; User registration and authentication;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Location-based travel services;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Payment processing and refund facilitation;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Personalized content recommendations;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Analytics, performance tracking, and A/B testing;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Customer communication and technical support;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Compliance with law enforcement or regulatory inquiries;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Consent-based marketing and advertising.&#8203;<br/> <br/></b></p>
<p><b>It further covers the Processing of Personal Data by authorized Data Processors <br/>operating under contractual obligations with TravelBuddyCore.INC. <br/>2.5 Exclusions from Scope <br/>This Privacy Policy does not apply to: <br/></b></p>
<p><b>&#9679;&#8203; Information that is anonymized or irreversibly aggregated beyond the scope of <br/>identification;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Activities or data collection performed by Third Parties (e.g., external booking <br/>engines, advertisers, or social platforms) not governed by our Data Processing <br/>Agreements;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Data processing carried out for purely personal, household, or journalistic <br/>purposes, as excluded under the IP Act.&#8203;<br/> <br/></b></p>
<p><b>Users are advised to consult the privacy policies of any Third-Party services or links <br/>accessed through the Platform. <br/></b></p>
<p><b>3. Categories and Sources of Personal Data <br/>3.1 Categories of Personal Data We Collect <br/>In accordance with the Individual Privacy Act, 2018 (Nepal) and global best practices, <br/>TravelBuddyCore.INC collects and processes the following categories of Personal Data <br/>from individuals using our Platform. Each category is processed only to the extent </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>necessary and proportionate to its purpose, consistent with the principle of data <br/>minimization. <br/>(a) Identity and Contact Data <br/></b></p>
<p><b>&#9679;&#8203; Full name&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Date of birth&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Permanent and temporary residential address&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Email address&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Mobile and landline numbers&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Government-issued identification documents (e.g., Citizenship Card, Passport, <br/>Voter ID)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Emergency contact information&#8203;<br/> <br/></b></p>
<p><b>(b) Payment and Transaction Data <br/></b></p>
<p><b>&#9679;&#8203; Credit or debit card details (processed securely through PCI-DSS compliant <br/>third-party processors)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Billing address&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Transaction identifiers&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Refund requests and dispute documentation&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Tax information where required&#8203;<br/> <br/></b></p>
<p><b>(c) Location Data <br/></b></p>
<p><b>&#9679;&#8203; Real-time geolocation (via GPS, Wi-Fi triangulation, or IP address)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Historical location trails based on use of the Platform&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Location-based search and booking patterns&#8203;<br/> <br/></b></p>
<p><b>(d) Travel History and Preferences </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Past and upcoming itineraries&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Booked trips, dates, and destinations&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Travel preferences (e.g., preferred airlines, dietary restrictions, accessibility <br/>needs)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Stated interests and preferences (e.g., adventure, religious, cultural travel)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Special requests (e.g., mobility assistance, language support)&#8203;<br/> <br/></b></p>
<p><b>(e) Device and Technical Data <br/></b></p>
<p><b>&#9679;&#8203; Device identifiers (IMEI, MAC address, IDFA, GAID)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Browser type and version, user-agent string&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Operating system and language settings&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Screen resolution and device model&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Session timestamps and server logs&#8203;<br/> <br/></b></p>
<p><b>(f) Behavioral and Usage Data <br/></b></p>
<p><b>&#9679;&#8203; Clickstream patterns, scroll behavior, and page views&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Duration of Platform engagement&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Navigation paths and feature interactions&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Participation in experiments (A/B tests, UI trials)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; In-app interactions and button selections&#8203;<br/> <br/></b></p>
<p><b>(g) User-Generated Content <br/></b></p>
<p><b>&#9679;&#8203; Travel reviews, comments, and ratings&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Uploaded images and videos, including metadata&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Event RSVPs and public profile entries&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Messages sent via the Platform (e.g., to tour guides or hosts)&#8203;<br/> <br/></b></p>
<p><b>(h) Social Graph and Third-Party Integration Data <br/></b></p>
<p><b>&#9679;&#8203; Social media login tokens (e.g., via Facebook, Google, Apple)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Profile information permitted by your social media account&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Friend or contact lists (if you grant explicit access)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Mutual group affiliations or travel circles on the Platform&#8203;<br/> <br/></b></p>
<p><b>(i) Marketing and Communication Preferences <br/></b></p>
<p><b>&#9679;&#8203; Notification and newsletter subscription preferences&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Record of opt-in/opt-out status for various contact channels&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Engagement with promotional materials and referral links&#8203;<br/> <br/></b></p>
<p><b>(j) Sensitive Personal Data (Collected Only with Explicit Consent) <br/></b></p>
<p><b>As defined under the Individual Privacy Act, 2018, and collected only where strictly <br/>necessary and explicitly consented to: <br/></b></p>
<p><b>&#9679;&#8203; Biometric identifiers (e.g., facial data for future facial recognition features)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Health-related information relevant to travel (e.g., wheelchair needs, dietary or <br/>medical restrictions)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Religious, ethnic, or caste data (only if volunteered by the user for preference <br/>tailoring)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Emergency contact information that implies sensitive associations&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Sexual orientation or gender identity (where self-disclosed, e.g., for LGBTQ+ <br/>group travel preferences)&#8203;<br/> <br/></b></p>
<p><b>We implement special safeguards, including encryption, limited access, and explicit <br/>consent mechanisms, for all Sensitive Personal Data. <br/></b></p>
<p><b> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>3.2 Sources of Personal Data <br/>We collect Personal Data from the following lawful and clearly disclosed sources: <br/>(a) Directly from You <br/></b></p>
<p><b>&#9679;&#8203; During account registration&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; While booking travel products or creating itineraries&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Through contact forms, surveys, or support interactions&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Via user-submitted content (reviews, media uploads, messages)&#8203;<br/> <br/></b></p>
<p><b>(b) Automatically Through Use of Our Platform <br/></b></p>
<p><b>&#9679;&#8203; Via cookies, web beacons, and analytics tags embedded in our website and <br/>mobile apps&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Through server-side logging and device telemetry&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Through our mobile applications (iOS and Android), which may access your <br/>location, device sensors, and usage patterns&#8203;<br/> <br/></b></p>
<p><b>(c) From Authorized Third Parties and Integrations <br/></b></p>
<p><b>&#9679;&#8203; Social login providers (e.g., Google, Facebook, Apple) that provide profile, friend <br/>list, or identity verification, as authorized by you&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Travel booking APIs (e.g., airline, hotel, and transport aggregators)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Calendar integrations (e.g., Google Calendar for syncing travel dates)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Mobile device app stores for attribution and performance data&#8203;<br/> <br/></b></p>
<p><b>(d) Generated or Derived by Us <br/></b></p>
<p><b>&#9679;&#8203; Preference profiles based on your past bookings and behavior&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Risk and fraud scores generated via automated analytics&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Group affiliations or social graphs inferred from interactions&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Sentiment and engagement scores for marketing personalization&#8203;<br/> <br/></b></p>
<p><b>4. Purposes of Processing and Lawful Bases <br/>TravelBuddyCore.INC processes Personal Data solely for specified, explicit, and <br/>legitimate purposes, and only where a valid lawful basis exists under the Individual <br/>Privacy Act, 2018 (Nepal) and applicable international laws. Each purpose is linked to a <br/>legal basis and is subject to principles of necessity, proportionality, and data <br/>minimization. <br/> <br/>4.1 Provision and Operation of the Platform <br/>Purpose:&#8203;<br/> To create and manage user accounts; authenticate access; enable travel search, <br/>booking, and itinerary features; provide customer service and respond to inquiries; allow <br/>communication with vendors or co-travelers via the Platform. <br/>Lawful Basis: <br/></b></p>
<p><b>&#9679;&#8203; Performance of Contract (Section 6 of IP Act; Article 6(1)(b) GDPR)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Legal Obligation (e.g., consumer protection, identity verification laws)&#8203;<br/> <br/></b></p>
<p><b> <br/>4.2 Payment Processing and Financial Transactions <br/>Purpose:&#8203;<br/> To securely process payments and refunds, detect fraudulent transactions, resolve <br/>disputes, and comply with audit and taxation obligations. <br/>Lawful Basis: <br/></b></p>
<p><b>&#9679;&#8203; Performance of Contract&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Legal Obligation (e.g., Income Tax Act 2058 of Nepal)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Legitimate Interests (fraud prevention and transaction integrity)&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>Safeguards:&#8203;<br/> We process payment data via PCI-DSS certified third-party processors and never store <br/>full card details on our servers. <br/> <br/>4.3 Personalization of Services and Content <br/>Purpose:&#8203;<br/> To personalize recommendations, itineraries, listings, offers, and featured experiences <br/>based on user location, travel history, preferences, and behavioral patterns. <br/>Lawful Basis: <br/></b></p>
<p><b>&#9679;&#8203; Legitimate Interests (user experience enhancement and service relevance)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Consent, where personalization involves profiling or use of sensitive personal <br/>preferences&#8203;<br/> <br/></b></p>
<p><b>Safeguards:&#8203;<br/> Users may opt out of personalization at any time via the Privacy Dashboard. <br/> <br/>4.4 Analytics, Product Improvement, and Research <br/>Purpose:&#8203;<br/> To conduct user experience research, A/B testing, product development, quality <br/>assurance, and usage diagnostics. <br/>Lawful Basis: <br/></b></p>
<p><b>&#9679;&#8203; Legitimate Interests (Platform improvement and service reliability)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Consent, where required by cookie laws or involving advanced profiling&#8203;<br/> <br/></b></p>
<p><b>Data Minimization:&#8203;<br/> Data is aggregated and anonymized wherever feasible. <br/> <br/>4.5 Security, Abuse Prevention, and Risk Management </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>Purpose:&#8203;<br/> To prevent fraud, detect suspicious behavior, investigate abuse or violations of terms, <br/>maintain platform integrity, and enforce our legal rights. <br/>Lawful Basis: <br/></b></p>
<p><b>&#9679;&#8203; Legitimate Interests (protection of rights, property, and users)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Legal Obligation (compliance with cybersecurity and criminal investigation laws)&#8203;<br/> <br/></b></p>
<p><b>Security Measures:&#8203;<br/> Real-time monitoring, rate-limiting, threat intelligence integration, and role-based access <br/>controls. <br/>4.6 Legal and Regulatory Compliance <br/>Purpose:&#8203;<br/> To comply with applicable law, tax, audit, court orders, regulatory investigations, or <br/>official requests (e.g., from the Nepal National Information Commission, courts, or <br/>financial regulators). <br/>Lawful Basis: <br/></b></p>
<p><b>&#9679;&#8203; Legal Obligation under Nepalese or applicable foreign law&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Public Interest, where necessary for law enforcement cooperation&#8203;<br/> <br/></b></p>
<p><b>Examples: <br/>&#9679;&#8203; Retention of booking records for 7 years&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Disclosure to courts or government bodies under lawful request&#8203;<br/></b></p>
<p><b> <br/> <br/>4.7 Communications and Notifications <br/>Purpose:&#8203;<br/> To send account-related communications, service alerts, system updates, changes to <br/>terms or policies, and responses to user inquiries. <br/>Lawful Basis: </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Performance of Contract&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Legal Obligation (e.g., breach notifications)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Legitimate Interests (informing users of essential service information)&#8203;<br/> <br/></b></p>
<p><b>Opt-Outs:&#8203;<br/> Only non-essential marketing messages are subject to opt-out rights. <br/> <br/>4.8 Marketing, Promotions, and Referrals <br/>Purpose:&#8203;<br/> To send personalized or generic marketing emails, SMS messages, promotional offers, <br/>contest invitations, and referral incentives. <br/>Lawful Basis: <br/></b></p>
<p><b>&#9679;&#8203; Consent (express, specific, and revocable at any time)&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Legitimate Interests, where permitted (e.g., marketing to existing customers with <br/>an opt-out option)&#8203;<br/> <br/></b></p>
<p><b>Control Mechanisms: <br/>&#9679;&#8203; Consent is obtained via clear UI prompts&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Users may manage preferences via the Privacy Dashboard&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; No sharing with advertisers without consent&#8203;<br/></b></p>
<p><b> <br/> <br/>4.9 Use of Sensitive Personal Data (with Explicit Consent Only) <br/>Purpose:&#8203;<br/> To enable services requiring sensitive data, such as health-related travel <br/>accommodations, biometric login, or preference-tailored group travel experiences. <br/>Lawful Basis: </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Explicit Consent (Section 12, IP Act; Article 9(2)(a), GDPR)&#8203;<br/> <br/></b></p>
<p><b>Special Safeguards: <br/>&#9679;&#8203; Highlighted and separate consent interface&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Right to withdraw consent at any time&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Encryption and strict access restrictions&#8203;<br/></b></p>
<p><b> <br/> <br/>4.10 Automated Decision-Making and AI Systems (future feature) <br/>Purpose:&#8203;<br/> To provide AI-based personalized recommendations, automatic itinerary planning, or <br/>fraud detection scoring. <br/>Lawful Basis: <br/></b></p>
<p><b>&#9679;&#8203; Consent, with the right to human intervention and contestation&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Legitimate Interests, if risk-mitigated and non-intrusive&#8203;<br/> <br/></b></p>
<p><b>Compliance Measures:&#8203;<br/> We will conduct Data Protection Impact Assessments (DPIAs) before deployment and <br/>provide transparent explanations to affected Data Subjects. <br/></b></p>
<p><b>5. Disclosure and Recipients of Personal Data <br/>TravelBuddyCore.INC may disclose your Personal Data to third parties only where such <br/>disclosure is lawful, necessary, proportionate, and subject to contractual, technical, and <br/>organizational safeguards. We do not engage in the sale of Personal Data as defined <br/>under any applicable privacy law, including California&#8217;s CCPA/CPRA. <br/>We classify disclosures into functional categories based on processing purposes and <br/>the role of the recipient. <br/>5.1. Affiliated Entities and Controlled Group Companies <br/>We may share Personal Data with our legally affiliated entities, subsidiaries, or branch <br/>offices solely for unified service delivery, data hosting, customer support continuity, </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>fraud detection, or internal analytics. All such entities are bound by intra-group data <br/>transfer agreements containing equivalent data protection clauses and security controls. <br/>If any such entity is located outside Nepal, such transfer will comply with Section 15 of <br/>the IP Act and follow one of the permitted cross-border mechanisms described in Section <br/>6 of this Policy. <br/>5.2. Third-Party Data Processors <br/>We engage vetted third parties to process data on our behalf (&#8220;Data Processors&#8221;), strictly <br/>pursuant to a written Data Processing Agreement (DPA) that: <br/></b></p>
<p><b>&#9679;&#8203; Prohibits further sub-processing without our written approval,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Binds the processor to confidentiality,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Requires implementation of industry-standard technical and organizational <br/>safeguards,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Limits data use solely to specified purposes,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Grants us audit rights or independent certification review mechanisms.&#8203;<br/> <br/></b></p>
<p><b>Examples of such processors include: <br/>&#9679;&#8203; Payment Processors: Stripe, Khalti, eSewa &#8211; for secure transaction execution and <br/></b></p>
<p><b>dispute resolution.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Cloud Infrastructure Providers: AWS, Google Cloud &#8211; for scalable and secure data <br/>storage and application hosting.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Analytics Platforms: Google Analytics, Hotjar, Mixpanel &#8211; to gather anonymized <br/>usage insights.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Marketing Platforms: Mailchimp, Meta Pixel &#8211; where you have opted in to receive <br/>promotional messages.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Moderation and Anti-Fraud Vendors: Tools that detect suspicious behavior, bots, <br/>or content violations.&#8203;<br/> <br/></b></p>
<p><b>All such processors are contractually prohibited from using your Personal Data for their <br/>own purposes or transferring it without our consent. <br/>5.3. Travel Partners and Integration Providers </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>Where you voluntarily initiate a booking, inquiry, or content-sharing action involving a <br/>travel service provider (e.g., hotel, airline, local guide, tour operator), we disclose only <br/>the data necessary to facilitate that transaction. This includes: <br/></b></p>
<p><b>&#9679;&#8203; Full name, contact details, booking references,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Travel preferences or special requests (e.g., dietary, accessibility),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Government ID details, where required for check-in or ticket issuance.&#8203;<br/> <br/></b></p>
<p><b>You are advised to review the privacy policies of these third-party vendors before <br/>submitting sensitive data, especially where the provider is outside Nepal. <br/>Integration providers (e.g., calendar syncs, map services, itinerary generators) are used <br/>only upon your activation, and disclosures are limited to what&#8217;s strictly required for the <br/>requested integration. <br/>5.4. Legal, Regulatory, and Government Authorities <br/>We will disclose Personal Data to competent authorities only where: <br/></b></p>
<p><b>&#9679;&#8203; Such disclosure is mandated by applicable law, including the Individual Privacy <br/>Act, Criminal Code of Nepal, or tax regulations;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We receive a valid court order, subpoena, or direction from a government agency;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Disclosure is necessary to respond to a formal investigation, data protection <br/>audit, or regulatory inquiry, such as from the Nepal National Information <br/>Commission (NIC) or Department of Tourism;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Disclosure is essential to prevent or respond to a crime, fraud, cyberattack, or <br/>other legally defined harm.&#8203;<br/> <br/></b></p>
<p><b>We assess every such request on a case-by-case basis and, where legally permissible, <br/>will notify affected Data Subjects of such disclosures. <br/>We do not respond to informal, extra-legal requests for data access from any authority. <br/>5.5. Successors in Interest (Corporate Restructuring Events) <br/>In the event of a merger, acquisition, joint venture, asset transfer, insolvency proceeding, <br/>or sale of TravelBuddyCore.INC or its operational divisions, Personal Data may be shared <br/>or transferred as part of the due diligence or transactional execution process. </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>Such transfers will be: <br/>&#9679;&#8203; Subject to confidentiality and non-disclosure agreements,&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Conducted with assurance of the successor&#8217;s continued compliance with <br/></b></p>
<p><b>applicable privacy law,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Accompanied by clear notices to affected Data Subjects prior to any material <br/>change in data processing purpose.&#8203;<br/> <br/></b></p>
<p><b>If the successor entity intends to materially change how it uses Personal Data, it will <br/>issue a new Privacy Policy and obtain consent where legally required. <br/>5.6. Your Authorized Representatives <br/>Where you explicitly authorize another individual (such as a travel companion, parent, <br/>legal guardian, or delegate) to access or manage your account, itinerary, or bookings, we <br/>may disclose relevant Personal Data to that individual under your instruction. <br/>Such authorization may be provided: <br/></b></p>
<p><b>&#9679;&#8203; Through the Platform&#8217;s delegation feature or family travel group module;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; In writing, with appropriate identity verification;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Pursuant to a lawful mandate under Nepalese civil or procedural law.&#8203;<br/> <br/></b></p>
<p><b>Revocation of authorization may be done at any time via the Privacy Dashboard, subject <br/>to verification. <br/>5.7. Publicly Shared Content <br/>If you submit user-generated content such as reviews, photos, public itineraries, or <br/>forum posts, those may be publicly visible to other Platform users. Such disclosures are <br/>made with your active contribution, and metadata such as username or timestamp may <br/>be displayed alongside the content. <br/>We provide tools to manage, edit, or delete such content at any time. <br/>We discourage sharing sensitive or identifying personal details in public content and <br/>disclaim liability for downstream use once content is publicly visible. <br/>5.8. Advertisers and Third-Party Ad Networks </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>We do not share your Personal Data with third-party advertisers unless you have <br/>provided prior, informed, and opt-in consent, in compliance with the IP Act, CCPA, and <br/>GDPR. <br/>Where targeted advertising is enabled (e.g., via cookies, device identifiers, Meta Pixel): <br/></b></p>
<p><b>&#9679;&#8203; Such data is shared only in hashed, pseudonymized form, where technically <br/>possible,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; You retain full rights to opt-out of such advertising via cookie banners or account <br/>settings,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We ensure all vendors are subject to data-sharing agreements with legal <br/>safeguards,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We do not permit re-identification or secondary use of shared advertising data.&#8203;<br/> <br/></b></p>
<p><b>Users under 18 (as defined in Brazil or other applicable law) are excluded from any <br/>behavioral advertising and may only receive contextual, non-personalized ads. <br/></b></p>
<p><b>6. International Data Transfers and Safeguards <br/>TravelBuddyCore.INC operates primarily within Nepal. However, due to the nature of <br/>modern travel services and digital platforms, certain Personal Data may be transferred to <br/>or stored in jurisdictions outside of Nepal, including countries that may not have data <br/>protection laws equivalent to those in Nepal or your country of residence. <br/>In such cases, we ensure that all cross-border transfers are carried out in strict <br/>accordance with applicable data protection law, and with adequate protections in place <br/>to maintain the confidentiality, integrity, and security of your Personal Data. <br/>6.1. Legal Basis for Cross-Border Transfers <br/>We rely on one or more of the following legal mechanisms to authorize the international <br/>transfer of Personal Data: <br/>(a) Consent (IP Act, &#167;4 &amp; &#167;15)&#8203;<br/> Where required, we will obtain your explicit and informed consent prior to transferring <br/>your Personal Data to a foreign jurisdiction, particularly where the data is sensitive (e.g., <br/>biometric data, financial data, travel ID documents). You may withdraw such consent at <br/>any time. <br/>(b) Necessity for Contractual Performance&#8203;<br/> Transfers are permitted where they are necessary for the performance of a contract </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>between you and TravelBuddyCore.INC (e.g., booking a hotel abroad, confirming an <br/>airline ticket, syncing your itinerary with international services). <br/>(c) Legal Obligation or Public Interest&#8203;<br/> In rare instances, transfers may occur where required by applicable laws, international <br/>treaties, or cooperation with anti-terrorism, cybercrime, or public health authorities. <br/>(d) Adequate Jurisdiction Recognition&#8203;<br/> Where feasible, we transfer data only to countries or organizations that the Government <br/>of Nepal (or equivalent data protection authorities) has recognized as providing an <br/>&#8220;adequate level&#8221; of data protection. <br/>(e) Binding Safeguards and Agreements&#8203;<br/> In all other cases, we will use robust contractual and organizational measures, described <br/>below, to ensure a comparable level of protection. <br/>6.2. Safeguards for Data Transfers <br/>To ensure lawful and secure international transfers, we implement at least one of the <br/>following safeguards: <br/></b></p>
<p><b>&#9679;&#8203; Standard Contractual Clauses (SCCs):&#8203;<br/> For recipients in jurisdictions not deemed adequate, we enter into European <br/>Commission-approved (or Nepal-adapted) SCCs with data importers, binding them <br/>to strict data handling, breach reporting, and user rights obligations.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Intra-Group Data Transfer Agreements:&#8203;<br/> Where data is transferred within affiliated group companies (e.g., sister <br/>companies or overseas developer teams), we use legally binding intra-group data <br/>protection agreements modeled on GDPR Article 46.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Data Anonymization or Pseudonymization:&#8203;<br/> Where full identifiability is not required, Personal Data is anonymized or <br/>pseudonymized before transfer, thereby removing or obscuring direct identifiers.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Third-Party Processor Contracts:&#8203;<br/> All international processors are engaged only after comprehensive due diligence <br/>and must sign a Data Processing Agreement (DPA) with cross-border clauses <br/>compliant with GDPR Art. 28 and IP Act &#167;15.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Encryption and Key Separation:&#8203;<br/> Transferred data is protected using end-to-end encryption, with key management <br/>handled solely by TravelBuddyCore.INC (not by overseas recipients). No <br/>unencrypted personal data is ever stored on foreign servers without adequate </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>safeguards.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Access Controls and Auditing:&#8203;<br/> Overseas recipients must implement role-based access controls, maintain data <br/>access logs, and support independent audits to confirm compliance.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Transfer Impact Assessments (TIA):&#8203;<br/> For transfers to countries with surveillance laws or lacking data subject rights, we <br/>conduct a risk-based Transfer Impact Assessment to determine if supplemental <br/>safeguards are needed (e.g., encryption, split-processing, pseudonymization).&#8203;<br/> <br/></b></p>
<p><b>6.3. Key Transfer Destinations <br/>The categories of third countries or regions where Personal Data may be transferred <br/>include: <br/></b></p>
<p><b>&#9679;&#8203; United States (e.g., cloud services, analytics tools),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; European Union Member States (e.g., itinerary integrations, server mirroring),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Singapore and India (e.g., customer service or regional payment processors),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; United Kingdom (e.g., legal counsel, financial compliance).&#8203;<br/> <br/></b></p>
<p><b>Each such transfer is handled in line with the safeguards set out in Section 6.2. <br/>6.4. Your Rights in the Context of International Transfers <br/>You may exercise the following rights related to international transfers of your Personal <br/>Data: <br/></b></p>
<p><b>&#9679;&#8203; Request a copy of the applicable data transfer agreement (e.g., SCCs),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Inquire about the country or entity to which your data has been transferred,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Object to a specific transfer based on compelling legitimate grounds,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Withdraw your consent to any transfer based on consent, with prospective effect.&#8203;<br/> <br/></b></p>
<p><b>Such requests can be made by contacting us at the details provided in Section 13 <br/>(Contact Information). We will respond within 15 working days, unless local law <br/>prescribes a different timeline. </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>6.5. Data Localization and Nepal Compliance <br/>Where Nepalese law requires data localization (e.g., financial data or data subject to <br/>specific government mandates), we comply by: <br/></b></p>
<p><b>&#9679;&#8203; Hosting such data within data centers physically located in Nepal, or&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Ensuring a primary encrypted copy remains in Nepal even if duplicates are <br/>mirrored abroad for availability purposes.&#8203;<br/> <br/></b></p>
<p><b>In cases of uncertainty, Nepalese law shall prevail over foreign processing arrangements, <br/>and foreign recipients are instructed to comply with Nepal's IP Act obligations. <br/></b></p>
<p><b>7. Data Retention and Storage Practices <br/>TravelBuddyCore.INC retains Personal Data only for as long as necessary to fulfill the <br/>specific purposes for which it was collected, including to comply with legal, accounting, <br/>contractual, or regulatory obligations, or to resolve disputes and enforce our <br/>agreements. This section outlines our data retention principles, specific timelines, <br/>storage mechanisms, archival protocols, and secure disposal processes. <br/>7.1. Legal Basis and Data Minimization Principle <br/>Under Section 4 of the Privacy Act, 2018 (Nepal), we are required to: <br/></b></p>
<p><b>&#9679;&#8203; Collect and store only such data as is necessary for a lawful purpose,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Retain data only for as long as needed for that purpose, and&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Ensure destruction or anonymization of data after its use is complete, unless <br/>otherwise required by law.&#8203;<br/> <br/></b></p>
<p><b>We also follow the purpose limitation and storage limitation principles under GDPR <br/>Article 5(1) and apply them equally to data of domestic and international users. <br/>7.2. Retention Periods by Data Category <br/>Unless a longer retention period is required by law, regulation, dispute resolution, fraud <br/>prevention, or backup retention policies, we retain Personal Data based on the following <br/>general timelines: <br/></b></p>
<p><b>&#9679;&#8203; Account Data (name, email, phone, nationality, preferences):&#8203;<br/> Retained until the user deletes their account, and for up to 1 additional year for </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>audit and fraud prevention unless earlier erasure is requested.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Transaction and Booking Records:&#8203;<br/> Retained for 6 years from the date of transaction to comply with tax, finance, and <br/>travel-sector regulations.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Identity Verification Documents (e.g., passport, citizenship):&#8203;<br/> Retained for a maximum of 180 days after successful verification unless a legal <br/>obligation (e.g., KYC compliance) requires longer retention.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Payment and Financial Data (excluding card numbers):&#8203;<br/> Stored securely and retained for 5 years, in line with Nepal Rastra Bank <br/>regulations and international anti-money laundering (AML) practices.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Chat Logs / Customer Support Interactions:&#8203;<br/> Retained for 2 years to improve service quality, defend against potential <br/>complaints, and analyze operational issues.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Cookies and Analytics Data:&#8203;<br/> Retained for 26 months, after which they are automatically anonymized or deleted <br/>(shorter if a user opts out or deletes cookies).&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Marketing Preferences and Communication Logs:&#8203;<br/> Retained until consent is withdrawn, and for no more than 30 days thereafter <br/>unless required to demonstrate compliance with consent logs.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Location Data (collected for itinerary syncing or weather-based <br/>recommendations):&#8203;<br/> Retained only during the session or for a maximum of 48 hours, and deleted <br/>unless needed for analytics or performance optimization (in anonymized form).&#8203;<br/> <br/></b></p>
<p><b>7.3. Data Storage and Media <br/>We store Personal Data using a hybrid cloud architecture that complies with both <br/>domestic data localization norms and international information security standards: <br/></b></p>
<p><b>&#9679;&#8203; Primary Storage Locations:&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; For Nepalese users: Localized servers based in Nepal, operated via <br/>certified data centers compliant with ISO 27001.&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; For global redundancy: Data is mirrored in encrypted form on cloud <br/>servers in Singapore, Germany, or the US, governed by the safeguards </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>outlined in Section 6 (International Transfers).&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Storage Media:&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; All structured data (e.g., profile information, bookings, payments) is stored <br/>in encrypted relational databases with strict access controls.&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Unstructured or transient data (e.g., documents, uploads) is stored in <br/>secure blob storage containers with lifecycle policies that automate <br/>purging.&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Temporary or cache data is held in in-memory databases (e.g., Redis) and <br/>flushed regularly, typically within 24&#8211;72 hours.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Encryption Protocols:&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; At Rest: AES-256 encryption is used for all stored data.&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; In Transit: TLS 1.3 encryption is applied for all data exchanges.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Access Controls:&#8203;<br/> Access to stored data is governed by least privilege principles and multi-factor <br/>authentication (MFA), and is fully logged and auditable.&#8203;<br/> <br/></b></p>
<p><b>7.4. Archival, Backups, and Legal Holds <br/>In limited circumstances, data may be retained beyond the standard period, solely for <br/>compliance, business continuity, or litigation preparedness: <br/></b></p>
<p><b>&#9679;&#8203; Backups:&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Encrypted backups are retained for up to 90 days in hot/warm storage tiers.&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Backups are subject to automated retention expiry and do not persist <br/>indefinitely.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Audit and Legal Hold:&#8203;<br/> If a legal claim, audit, investigation, or official request is pending, we may <br/>suspend deletion of relevant data categories via a &#8220;legal hold&#8221; protocol until the <br/>matter is resolved.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Disaster Recovery Copies:&#8203;<br/> Retained as part of our Business Continuity Plan for a rolling 12-month retention, </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>encrypted and stored off-site.&#8203;<br/> <br/></b></p>
<p><b>7.5. Secure Disposal and Deletion <br/>When the retention period ends or upon valid request for erasure, Personal Data is <br/>irreversibly deleted or anonymized using industry-standard protocols: <br/></b></p>
<p><b>&#9679;&#8203; Digital Data Deletion:&#8203;<br/> Secure overwriting using NIST 800-88 &quot;Clear&quot; or &quot;Purge&quot; methods to ensure data <br/>is unrecoverable.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Anonymization:&#8203;<br/> Where operational analytics is still needed, data is pseudonymized or aggregated <br/>in a way that it cannot be linked back to any individual.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Paper Records (if any):&#8203;<br/> Physically destroyed using cross-cut shredders or secure document disposal <br/>vendors compliant with ISO 21964.&#8203;<br/> <br/></b></p>
<p><b>All deletion actions are recorded in our internal logs for audit trail and verification. <br/>7.6. Your Rights Regarding Data Retention <br/>As a data subject, you have the right to: <br/></b></p>
<p><b>&#9679;&#8203; Request confirmation of whether we retain specific types of Personal Data,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Request early deletion of your data under Section 15 of Nepal&#8217;s Privacy Act,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Request a copy of our data destruction protocol for specific categories, and&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Challenge excessive retention by filing a request with our DPO.&#8203;<br/> <br/></b></p>
<p><b>We will assess such requests within 15 business days, subject to applicable laws. <br/></b></p>
<p><b>8. Your Data Protection Rights <br/>TravelBuddyCore.INC is committed to ensuring that every user&#8212;regardless of nationality <br/>or jurisdiction&#8212;retains clear, enforceable rights regarding their Personal Data. These <br/>rights are grounded in the Privacy Act of Nepal (2018) and aligned with international <br/>human rights and data protection norms to the extent permitted under applicable law. <br/>As a data subject, you have the following rights: </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b> <br/>8.1. Right to Be Informed <br/>You have the right to be informed about: <br/></b></p>
<p><b>&#9679;&#8203; What data we collect, the purposes for which we process it, and the legal basis for <br/>doing so,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; With whom we share your data (e.g., service providers, payment processors, <br/>authorities),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Where your data is stored, transferred, or processed, including cross-border <br/>transfers, and&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; How long we retain your data and under what conditions it may be deleted or <br/>retained longer.&#8203;<br/> <br/></b></p>
<p><b>Our Privacy Policy, Cookie Policy, Terms of Use, and consent dialogs provide this <br/>information in plain and accessible language. <br/> <br/>8.2. Right to Access <br/>Under Section 12 of the Privacy Act, 2018, you have the right to: <br/></b></p>
<p><b>&#9679;&#8203; Request a copy of the Personal Data we hold about you,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Know whether your data has been disclosed to any third party, and&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Obtain details on the source of your data, if it was not collected directly from you.&#8203;<br/> <br/></b></p>
<p><b>How to Exercise:&#8203;<br/> Email us at privacy@travelbuddycore.inc with the subject &#8220;Data Access Request.&#8221; We <br/>will verify your identity before fulfilling the request. A response will be provided within 15 <br/>business days. <br/> <br/>8.3. Right to Rectification <br/>If your data is inaccurate, outdated, or incomplete, you may request that we correct, <br/>update, or complete it. </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; This right applies to profile details, preferences, uploaded documents, and any <br/>auto-filled forms.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We may require supporting documentation (e.g., corrected ID, email verification) <br/>before processing the update.&#8203;<br/> <br/></b></p>
<p><b>Limitations:&#8203;<br/> If we rely on third-party data (e.g., airline systems, payment processors), rectification <br/>may depend on their correction protocols. <br/> <br/>8.4. Right to Erasure (Right to Be Forgotten) <br/>You have the right to request that we delete your Personal Data: <br/></b></p>
<p><b>&#9679;&#8203; If it is no longer necessary for the purpose for which it was collected,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; If you withdraw consent and there is no overriding legal ground,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; If the data was collected unlawfully or without proper notice, or&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; If the retention period has expired, unless subject to a legal hold.&#8203;<br/> <br/></b></p>
<p><b>Exclusions:&#8203;<br/> We may refuse deletion if the data is: <br/></b></p>
<p><b>&#9679;&#8203; Necessary for ongoing legal proceedings or audits,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Required to fulfill a contract (e.g., upcoming travel booking),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Held for compliance with local tax, anti-fraud, or financial reporting laws.&#8203;<br/> <br/></b></p>
<p><b>All erasure requests will be documented and replied to within 15 business days. <br/> <br/>8.5. Right to Restrict Processing <br/>You may request that we limit the way we use your data if: <br/></b></p>
<p><b>&#9679;&#8203; You contest the accuracy of the data,&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; You believe our processing is unlawful but oppose deletion,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; You need the data preserved for a legal claim,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; You have objected to processing and your objection is pending review.&#8203;<br/> <br/></b></p>
<p><b>During such restriction, your data will be flagged as inactive and excluded from <br/>automated or operational processing, except where legally required. <br/> <br/>8.6. Right to Object to Processing <br/>You have the right to object to the processing of your Personal Data when: <br/></b></p>
<p><b>&#9679;&#8203; Processing is based on our legitimate interests (e.g., analytics, personalization),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Your data is being used for direct marketing or automated profiling.&#8203;<br/> <br/></b></p>
<p><b>Result of objection:&#8203;<br/> We will immediately cease processing unless we demonstrate compelling legal grounds <br/>or ongoing contractual necessity. <br/> <br/>8.7. Right to Data Portability <br/>You may request a machine-readable, structured copy of your Personal Data: <br/></b></p>
<p><b>&#9679;&#8203; Applicable only to data provided by you (not inferred),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Only where processing is based on consent or contract,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Delivered in a standard format (e.g., JSON, CSV, XML).&#8203;<br/> <br/></b></p>
<p><b>We do not provide portability for anonymized data, derived data (e.g., travel patterns), or <br/>data collected under legal obligations. <br/> <br/>8.8. Right Not to Be Subject to Automated Decisions <br/>You have the right not to be subject to a decision based solely on automated processing, <br/>including profiling, that significantly affects you. </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>Clarification:&#8203;<br/> TravelBuddyCore.INC does not make booking, cancellation, or refund decisions solely <br/>based on AI or automated rules. If any such mechanism is used (e.g., fraud flagging), a <br/>human reviewer will confirm the final outcome upon your request. <br/> <br/>8.9. Right to Withdraw Consent <br/>If you have previously consented to the collection or use of your Personal Data, you may: <br/></b></p>
<p><b>&#9679;&#8203; Withdraw your consent at any time via account settings or by contacting our DPO,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We will stop further processing within 10 business days, unless an overriding <br/>legal basis exists.&#8203;<br/> <br/></b></p>
<p><b>Withdrawing consent does not affect the legality of processing already performed before <br/>withdrawal. <br/> <br/>8.10. Right to File a Complaint <br/>You may file a complaint if you believe your data rights have been violated. You can: <br/></b></p>
<p><b>&#9679;&#8203; Email us directly at privacy@travelbuddycore.inc,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Contact our DPO at dpo@travelbuddycore.inc for confidential dispute resolution,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Lodge a formal complaint with the Privacy Commission of Nepal or the District <br/>Court under the Civil Code (Naya Muluki Ain) if you are not satisfied with our <br/>response.&#8203;<br/> <br/></b></p>
<p><b>We are legally bound to respond and take corrective action within 35 days under Section <br/>17 of the Privacy Act. <br/></b></p>
<p><b>9. Security of Your Data <br/>TravelBuddyCore.INC is committed to protecting your Personal Data through a <br/>combination of technical, administrative, and physical safeguards, in compliance with <br/>applicable laws of Nepal and aligned with globally accepted cybersecurity standards. <br/>We recognize that data protection is not a one-time implementation but a continual <br/>process of governance, risk assessment, and mitigation across all operational layers. </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b> <br/>9.1. Security by Design and by Default <br/>We adopt Security by Design and by Default in every system, application, and service <br/>architecture: <br/></b></p>
<p><b>&#9679;&#8203; Minimal data collection: Only data strictly necessary for a specified purpose is <br/>collected.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Default privacy settings: User accounts are set to the most privacy-preserving <br/>settings unless explicitly changed.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Secure development lifecycle (SDLC): All software is developed using secure <br/>coding practices, threat modeling, and vulnerability testing before release.&#8203;<br/> <br/></b></p>
<p><b> <br/>9.2. Physical and Infrastructure-Level Security <br/>Our infrastructure is hosted in tier-3 or above data centers located within Nepal or in <br/>jurisdictions offering comparable or stronger protections. All centers maintain: <br/></b></p>
<p><b>&#9679;&#8203; 24/7 on-site security personnel,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Multi-factor access control systems (biometric + badge),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Fire suppression, flood control, and temperature-regulated server environments,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Independent backup power and internet connectivity.&#8203;<br/> <br/></b></p>
<p><b>For our local (in-house) infrastructure: <br/>&#9679;&#8203; Devices are asset-registered and subject to automatic device encryption,&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Any physical media (e.g., USB drives) must be encrypted and signed out under <br/></b></p>
<p><b>internal SOP,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Staff access to hardware is logged and monitored.&#8203;<br/> <br/></b></p>
<p><b> <br/>9.3. Network and System Security </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>Our network perimeter and internal systems are protected by layered security controls: <br/>&#9679;&#8203; Firewalls and Intrusion Detection/Prevention Systems (IDS/IPS),&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; End-to-end encryption for data in transit (TLS 1.3 or higher),&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; AES-256 encryption for data at rest in databases, caches, and backups,&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Anti-malware and endpoint detection systems across all connected assets,&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; VPN-only access to internal systems, secured with multi-factor authentication.&#8203;<br/></b></p>
<p><b> <br/>Systems are regularly patched and subject to scheduled penetration testing, both <br/>internally and by independent third parties. <br/> <br/>9.4. Access Controls and Identity Management <br/>We enforce strict Role-Based Access Control (RBAC) and least privilege principles: <br/></b></p>
<p><b>&#9679;&#8203; Only personnel with a legitimate business need can access your data,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; All access is logged, timestamped, and periodically audited,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Passwords follow strong complexity standards (min. 14 characters, rotated every <br/>90 days),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Admin activities are monitored in real-time and protected by hardware-based 2FA <br/>(e.g., YubiKey).&#8203;<br/> <br/></b></p>
<p><b>Departing employees or terminated contractors are subject to instant revocation of <br/>credentials, including offboarding from Git, SFTP, internal dashboards, and email. <br/> <br/>9.5. Data Segmentation and Anonymization <br/></b></p>
<p><b>&#9679;&#8203; User data is segmented by service layer, meaning no single system has universal <br/>access to raw data, reducing attack surface.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Anonymization and pseudonymization are used where full identification is not <br/>required (e.g., analytics, feature usage testing).&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Logs and backups are scrubbed of unnecessary identifiers, or hashed where <br/>reversibility is not needed.&#8203;<br/> <br/></b></p>
<p><b> <br/>9.6. Breach Detection and Incident Response <br/>We maintain a documented, rehearsed incident response plan (IRP), including: <br/></b></p>
<p><b>&#9679;&#8203; 24/7 automated breach detection alerts tied to SIEM systems,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Categorized threat levels (e.g., data exfiltration, ransomware, insider access),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; A dedicated incident response team trained to contain, triage, investigate, and <br/>document every event,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Engagement with local law enforcement and Nepal&#8217;s National Cyber Security <br/>Center when required.&#8203;<br/> <br/></b></p>
<p><b>Breach Notification:&#8203;<br/> In the event of a data breach involving your Personal Data: <br/></b></p>
<p><b>&#9679;&#8203; You will be notified within 72 hours of confirmation, via email and/or in-app alert,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The notice will include details on the scope, impact, and remediation steps,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Where applicable, we will also notify the Privacy Commission of Nepal.&#8203;<br/> <br/></b></p>
<p><b> <br/>9.7. Secure Development Practices <br/>All new features or system changes are subject to: <br/></b></p>
<p><b>&#9679;&#8203; Code reviews with security checkpoints (e.g., OWASP Top 10, SSRF, CSRF, XSS),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Staging environments with sandboxed test data&#8212;no live user data used for <br/>testing,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Automated static and dynamic code analysis prior to production release,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Periodic source code audits by external cybersecurity vendors.&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b> <br/>9.8. Vendor Risk Management <br/>All third-party service providers (e.g., payment processors, cloud hosting, analytics) <br/>undergo: <br/></b></p>
<p><b>&#9679;&#8203; Security due diligence and contractually binding Data Protection Agreements <br/>(DPAs),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Verification of ISO 27001, SOC 2 Type II, or equivalent certifications,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Restriction to data processing only under our written instructions,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Prohibition of onward data transfers without our express consent.&#8203;<br/> <br/></b></p>
<p><b> <br/>9.9. Internal Governance and Staff Training <br/></b></p>
<p><b>&#9679;&#8203; All employees undergo mandatory data protection and cybersecurity training <br/>within 30 days of hiring and every 12 months thereafter,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Confidentiality agreements and non-disclosure clauses are embedded into all <br/>employment and contractor agreements,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Any employee found to have violated data security rules is subject to disciplinary <br/>actions, including termination and legal prosecution under Nepali Civil Code.&#8203;<br/> <br/></b></p>
<p><b> <br/>9.10. Continuous Review and Audit <br/></b></p>
<p><b>&#9679;&#8203; We conduct quarterly internal security audits and annual third-party audits of our <br/>systems and policies,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Our Data Protection Officer (DPO) monitors global best practices and updates <br/>internal policies accordingly,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Our security practices are evaluated annually against the latest cyber threats, <br/>regulatory changes, and technical advancements. <br/></b></p>
<p><b>10. International Data Transfers </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>TravelBuddyCore.INC operates exclusively from Nepal but acknowledges that in certain <br/>circumstances, Personal Data may be processed, stored, or accessed outside the <br/>territorial jurisdiction of Nepal. These international transfers may occur when: <br/></b></p>
<p><b>&#9679;&#8203; We use cloud-based infrastructure or third-party services hosted outside Nepal,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Users interact with our platform from other countries (e.g., tourists booking <br/>services from abroad),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We engage specialized vendors for services like customer support, analytics, <br/>fraud detection, or IT development.&#8203;<br/> <br/></b></p>
<p><b>We take robust legal, contractual, and technical measures to ensure that all such <br/>transfers are lawful, proportionate, and secure. <br/> <br/>10.1. Data Sovereignty and Nepalese Legal Obligations <br/>We comply with the Privacy Act of Nepal, 2018, which states that Personal Data of Nepali <br/>citizens must not be transferred outside Nepal without ensuring that the receiving <br/>country or organization provides an adequate level of data protection. <br/>Accordingly, before transferring any data internationally, we evaluate: <br/></b></p>
<p><b>&#9679;&#8203; The data protection laws of the recipient jurisdiction,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The nature of the data being transferred (e.g., sensitive, biometric, or financial),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The purpose and necessity of the transfer,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The risks and available safeguards.&#8203;<br/> <br/></b></p>
<p><b>No data is transferred internationally unless such transfer is: <br/>&#9679;&#8203; Authorized by the data subject&#8217;s explicit and informed consent, or&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Necessary for contract performance at the data subject&#8217;s request, or&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Mandated by applicable legal obligations (e.g., fraud detection or law <br/></b></p>
<p><b>enforcement), or&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Protected by contractual or organizational safeguards ensuring adequate <br/>protection.&#8203;<br/> <br/></b></p>
<p><b> <br/>10.2. Types of International Transfers <br/>We currently engage in the following categories of international data transfers: <br/></b></p>
<p><b>1.&#8203; Cloud Infrastructure Providers&#8203;<br/> Our platform may be hosted or backed up on cloud infrastructure providers (e.g., <br/>Amazon Web Services, Google Cloud, Microsoft Azure) that maintain data centers <br/>in countries like Singapore, Germany, or the United States. In such cases:&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Data is encrypted both in transit and at rest,&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Access is limited to specific system components (e.g., storage buckets, <br/>container logs),&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; We ensure these vendors comply with recognized security standards (e.g., <br/>ISO 27001, SOC 2, GDPR-compliance frameworks).&#8203;<br/> <br/></b></p>
<p><b>2.&#8203; Email and Communication Services&#8203;<br/> We use third-party services (e.g., Mailgun, Twilio, SendGrid) for email, SMS, and <br/>in-app messaging delivery, which may route data through international servers. <br/>Messages may contain contact information or behavioral metadata (e.g., open <br/>rates, bounce data).&#8203;<br/> <br/></b></p>
<p><b>3.&#8203; Analytics and Performance Monitoring Tools&#8203;<br/> Tools like Google Analytics, Mixpanel, or Hotjar may collect non-sensitive <br/>behavioral data (e.g., click rates, session duration) from international users. We <br/>ensure:&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Data is pseudonymized or anonymized wherever possible,&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; IP anonymization is enabled by default,&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Tracking identifiers (cookies, pixels) are governed by our [Cookie Policy] <br/>and user consent mechanisms.&#8203;<br/> <br/></b></p>
<p><b>4.&#8203; Customer Support and IT Development Vendors&#8203;<br/> We may contract specialized service providers located outside Nepal (e.g., in <br/>India or the Philippines) for support ticket management, bug resolution, or UX </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>testing. All such vendors are subject to:&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Binding Service Agreements and Data Processing Agreements (DPAs),&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Non-Disclosure Agreements (NDAs),&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Role-specific access with time-limited authorization.&#8203;<br/> <br/></b></p>
<p><b> <br/>10.3. Safeguards for International Transfers <br/>When Personal Data must be transferred to countries that may not have equivalent data <br/>protection laws as Nepal, we implement one or more of the following safeguards: <br/></b></p>
<p><b>&#9679;&#8203; Standard Contractual Clauses (SCCs) as adopted by the European Commission or <br/>similar contractual instruments,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Binding Corporate Rules (BCRs), where the transfer occurs within a corporate <br/>group,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Certification mechanisms under international frameworks (e.g., APEC CBPR or <br/>Privacy Shield Framework where applicable),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Explicit and informed consent from the data subject, with a clear explanation of:&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; What data is transferred,&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; To whom it is transferred,&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; What risks may be involved,&#8203;<br/> <br/></b></p>
<p><b>&#9675;&#8203; Whether the data subject can withdraw consent and what consequences <br/>follow.&#8203;<br/> <br/></b></p>
<p><b> <br/>10.4. Consent for International Transfers <br/>In any case where: <br/></b></p>
<p><b>&#9679;&#8203; The transfer is not contractually required,&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; No adequacy framework applies, and&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; No legally binding instrument is in place,&#8203;<br/> <br/></b></p>
<p><b>We will request your explicit consent before transferring your Personal Data across <br/>borders. <br/>This consent will: <br/></b></p>
<p><b>&#9679;&#8203; Be recorded at the time of collection,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Be revocable at any time via your user account settings or by contacting us <br/>directly,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Not affect your ability to use our core services unless the transfer is essential for <br/>functionality.&#8203;<br/> <br/></b></p>
<p><b> <br/>10.5. Storage Locations and Data Retention Abroad <br/>We take every reasonable step to limit the amount and duration of data held outside <br/>Nepal, including: <br/></b></p>
<p><b>&#9679;&#8203; Regional data replication policies where applicable (e.g., limiting Asian user data <br/>to Asia-Pacific cloud zones),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Enforcing automated data deletion schedules after predefined retention periods <br/>(as per Section 8 of this Policy),&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Regular auditing of foreign vendors' data destruction and backup practices.&#8203;<br/> <br/></b></p>
<p><b> <br/>10.6. Data Subject Rights and Remedies <br/>Even if your data is stored or processed outside Nepal, we guarantee the following rights <br/>under this Policy and Nepali law: <br/></b></p>
<p><b>&#9679;&#8203; Right to Access &#8211; you may request confirmation of whether your data was <br/>transferred and to whom,&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Right to Object &#8211; you may object to certain transfers, especially for marketing or <br/>analytics purposes,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Right to Withdraw Consent &#8211; you may withdraw your consent to transfer at any <br/>time,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Right to Lodge a Complaint &#8211; you may contact us or submit a complaint to the <br/>Privacy Commission of Nepal if you believe your data was transferred improperly.&#8203;<br/> <br/></b></p>
<p><b>We will make best efforts to ensure that any vendors or partners located abroad honor <br/>your rights to the fullest extent possible, even if not legally obligated to do so in their <br/>jurisdiction. <br/></b></p>
<p><b>11.&#8203;Data Accuracy and Correction Obligations&#8203;<br/> <br/>11.1 Duty of Accuracy <br/>TravelBuddyCore.INC (&#8220;TravelBuddyCore&#8221;) shall take reasonable and <br/>proportionate steps to ensure that all Personal Data it Processes is accurate, <br/>complete, and, where necessary, kept up to date, having regard to the purposes <br/>for which such Personal Data is collected and processed. This duty shall apply at <br/>the point of data collection, as well as during ongoing processing. <br/>We may use automated validation mechanisms (e.g., format checks, <br/>cross-reference verification with government-issued identifiers, email bounce <br/>tracking) to identify inaccuracies. However, ultimate responsibility for the <br/>accuracy of information submitted lies with the Data Subject, except where we <br/>independently validate or verify such information. <br/>11.2 User Responsibilities <br/>You, as the Data Subject, are legally obliged under applicable privacy laws, <br/>including but not limited to Section 3(f) of the Nepal Individual Privacy Act, Article <br/>5(1)(d) of the GDPR, and Section 7(4) of India&#8217;s DPDP Act, to: <br/></b></p>
<p><b>&#9679;&#8203; Provide truthful, accurate, and complete information when using the <br/>Platform;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Promptly notify us of any changes to your Personal Data (e.g., updated <br/>contact information or identification documents);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Avoid submitting falsified, outdated, or impersonated data under any <br/>circumstance.&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>11.3 Mechanisms for Correction <br/>You may request correction or rectification of your Personal Data through one or <br/>more of the following mechanisms: <br/>a. Privacy Dashboard: If you are a registered user, log in and navigate to the <br/>Privacy Dashboard to access editable fields. Fields that are locked (e.g., identity <br/>verification) will display instructions for requesting updates. <br/>b. Direct Request: Submit a written request via email to <br/>privacy@travelbuddycore.inc with subject line &#8220;Data Correction Request&#8221;, <br/>specifying: <br/></b></p>
<p><b>&#9679;&#8203; The data field you wish to correct;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The accurate data to be substituted;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Supporting documents, where applicable (e.g., updated ID, utility bill).&#8203;<br/> <br/></b></p>
<p><b>11.4 Verification and Response Timelines <br/>Upon receiving a correction request, we shall: <br/></b></p>
<p><b>&#9679;&#8203; Acknowledge the request within 5 business days;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Verify your identity using previously submitted Personal Data and/or <br/>identity proof;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Fulfill the correction request within 15 calendar days of acknowledgment, <br/>or provide written justification for delay, with a maximum permissible <br/>extension of an additional 15 calendar days for complex or legally <br/>ambiguous cases.&#8203;<br/> <br/></b></p>
<p><b>For Nepalese Data Subjects, we comply with Section 12(2) of the IP Act, and will <br/>submit correction confirmations or rejections within 30 days (extendable once by <br/>15 days in exceptional circumstances). <br/>11.5 Denial of Correction <br/>We reserve the right to deny a correction request where: <br/></b></p>
<p><b>&#9679;&#8203; The request is manifestly unfounded, repetitive, or abusive;&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; The proposed data is unverifiable or contradicts verified records;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Correction would contravene a legal obligation or compromise ongoing <br/>investigations.&#8203;<br/> <br/></b></p>
<p><b>If a correction request is denied, you will be informed in writing with: <br/>&#9679;&#8203; Reasons for denial;&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; Citation of applicable legal grounds;&#8203;<br/></b></p>
<p><b> <br/>&#9679;&#8203; The right to lodge a complaint with the National Information Commission <br/></b></p>
<p><b>(Nepal), or another relevant authority.&#8203;<br/> <br/></b></p>
<p><b>11.6 Audit Logging <br/>All data correction activities are logged and retained for 3 years for compliance <br/>verification and audit purposes. Such logs include: <br/></b></p>
<p><b>&#9679;&#8203; Identity of the requester;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Nature of the correction;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Time and date of request and resolution;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Internal reviewer or system agent responsible.&#8203;<br/> <br/></b></p>
<p><b>11.7 Correction of Third-Party Data <br/>If you request correction of Personal Data sourced from third-party partners (e.g., <br/>booking engines, identity verification providers), we will: <br/></b></p>
<p><b>&#9679;&#8203; Notify the originating third-party Data Controller or Data Provider of the <br/>requested change;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Assist you in submitting a direct request where we are not the Controller;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Reflect any updates provided by the third party within our systems.&#8203;<br/> <br/></b></p>
<p><b>11.8 Special Categories </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>Where the inaccuracy involves Sensitive Personal Data (e.g., biometric identifiers, <br/>religious beliefs, health data), we will seek additional verification and consent in <br/>accordance with local legal requirements before processing the correction. We <br/>may request notarized documentation or other forms of legal attestation. <br/></b></p>
<p><b>12. Grievance Redressal and Enforcement Mechanism&#8203;<br/> <br/>12.1 User&#8217;s Right to File Grievances <br/>Every Data Subject, whether a user, customer, vendor, or third-party individual whose <br/>data is processed by TravelBuddyCore.INC (&quot;TravelBuddyCore&quot;), retains the right to raise <br/>concerns, file complaints, and seek redress regarding: <br/></b></p>
<p><b>&#9679;&#8203; Unauthorized access, processing, or disclosure of Personal Data;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Failure to respond to data rights requests within prescribed timelines;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Disputes over data accuracy or refusal of correction (as outlined in Chapter 11);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Inappropriate or excessive data collection;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Perceived violations of applicable data protection laws or this Privacy Policy.&#8203;<br/> <br/></b></p>
<p><b>12.2 Grievance Submission Channels <br/>Grievances may be submitted through any of the following official and recorded <br/>channels: <br/>a. Email: Send a detailed written complaint to grievance@travelbuddycore.inc. Use the <br/>subject line &#8220;Personal Data Grievance &#8211; [Your Full Name]&#8221;. <br/>b. In-App/Website Form: Logged-in users may use the designated &quot;Data Grievance Form&quot; <br/>accessible via the Privacy Dashboard. <br/>c. Postal Submission (Recommended for Legal Correspondence):&#8203;<br/> Data Protection Officer&#8203;<br/> TravelBuddyCore.INC&#8203;<br/> Legal &amp; Compliance Division&#8203;<br/> [Insert Legal Address &#8211; Pokhara or Kathmandu]&#8203;<br/> Nepal <br/>d. Phone (for procedural help only): A dedicated helpline is available at +977-[Insert <br/>Number], operating Monday to Friday, 9 AM to 6 PM NPT. </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>12.3 Format and Required Details <br/>To ensure a timely and appropriate investigation, grievance submissions must include: <br/></b></p>
<p><b>&#9679;&#8203; Full Name and Contact Details;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Description of the issue, including specific data elements or interactions involved;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Date(s) of incident(s);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Supporting evidence or documentation (e.g., screenshots, correspondence);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The specific remedy sought (e.g., erasure, correction, acknowledgment, apology).&#8203;<br/> <br/></b></p>
<p><b>Anonymous or pseudonymous grievances will be acknowledged but may not be <br/>actionable unless accompanied by verifiable evidence. <br/>12.4 Internal Review and Resolution Process <br/>Upon receipt of a grievance: <br/>a. Acknowledgment: A formal acknowledgment will be issued within 5 business days, <br/>containing a case reference number and name of the assigned case officer. <br/>b. Preliminary Investigation: The Grievance Officer or designated Data Compliance <br/>Specialist will conduct a preliminary assessment within 10 calendar days, which may <br/>include seeking clarification from the complainant. <br/>c. Final Determination and Remedy: A formal resolution shall be communicated within 30 <br/>calendar days of receipt of the grievance. Possible remedies include: <br/></b></p>
<p><b>&#9679;&#8203; Confirmation of correction, erasure, or restriction;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Apology or written explanation;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Disciplinary action against internal personnel (where relevant);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Notification of changes to processes or practices;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Denial of grievance, with reasoned justification and legal reference.&#8203;<br/> <br/></b></p>
<p><b>d. Extension: Where a grievance requires complex factual or legal analysis, the <br/>resolution period may be extended once for up to 15 calendar days, with written notice to <br/>the complainant. </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>12.5 Right to Escalate <br/>If the user is dissatisfied with TravelBuddyCore&#8217;s grievance response, they may escalate <br/>the matter to the appropriate supervisory or judicial body: <br/>a. In Nepal: <br/></b></p>
<p><b>&#9679;&#8203; National Information Commission (NIC), under Sections 21&#8211;23 of the Individual <br/>Privacy Act, 2075.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The concerned District Court for judicial remedies under civil law.&#8203;<br/> <br/></b></p>
<p><b>b. In India: <br/>&#9679;&#8203; Data Protection Board of India (under Section 21 of the DPDP Act, 2023), upon <br/></b></p>
<p><b>exhaustion of TravelBuddyCore's internal redressal mechanism.&#8203;<br/> <br/></b></p>
<p><b>c. In the EU/EEA: <br/>&#9679;&#8203; The Data Protection Authority (DPA) in the relevant Member State of residence or <br/></b></p>
<p><b>where the violation occurred, pursuant to Articles 77&#8211;79 of the GDPR.&#8203;<br/> <br/></b></p>
<p><b>12.6 Recordkeeping and Audit <br/>All grievance-related documentation (including submissions, correspondence, internal <br/>notes, and final outcomes) shall be securely retained for a minimum period of 3 years, <br/>extendable to 7 years in cases involving legal disputes or regulatory inquiries. <br/>Redacted records may be included in annual Data Protection Impact Assessments <br/>(DPIAs) and internal compliance audits to identify patterns, risks, or systemic issues <br/>requiring remediation. <br/> <br/>13.Data Minimization and Purpose Limitation&#8203;<br/> <br/>13.1 Core Principles <br/>a. Purpose Limitation: Personal Data collected shall only be processed for specific, <br/>explicit, and legitimate purposes disclosed at the time of collection. It shall not be further <br/>processed in a manner incompatible with those purposes unless: </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; Additional consent is obtained, or&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; A legal obligation or public interest justifies the change.&#8203;<br/> <br/></b></p>
<p><b>b. Data Minimization: Only the minimum amount of Personal Data required to fulfill a <br/>clearly identified purpose will be collected and retained. Irrelevant, excessive, or <br/>outdated data is strictly prohibited from being gathered or retained. <br/>13.2 Application of Principles in Practice <br/></b></p>
<p><b>&#9679;&#8203; TravelBuddyCore.INC avoids collecting personal identifiers (e.g., passport <br/>number, GPS data, emergency contacts) unless specifically required for travel <br/>bookings, safety alerts, or legal obligations.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Users are not required to provide biometric or financial account data unless such <br/>information is directly needed (e.g., for payment processing or fraud prevention).&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Sensitive personal data (e.g., health conditions, dietary preferences, religious <br/>information) is collected only when explicitly necessary to provide a service (e.g., <br/>tour accommodation needs) and with explicit consent.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Aggregated and anonymized usage data (e.g., for analytics or product <br/>improvement) is kept separate from identifiable data and handled under a separate <br/>internal data usage policy.&#8203;<br/> <br/></b></p>
<p><b>13.3 Periodic Review and Data Reduction <br/>&#9679;&#8203; TravelBuddyCore conducts quarterly reviews of all data collection forms, APIs, <br/></b></p>
<p><b>and backend processes to ensure no excessive or unnecessary fields are being <br/>used.&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Outdated or redundant data is flagged for deletion under our retention schedule <br/>(see Chapter 7).&#8203;<br/> <br/></b></p>
<p><b>13.4 Third-Party Processors <br/>TravelBuddyCore contractually mandates all subprocessors (e.g., payment gateways, <br/>booking aggregators) to adhere to the same principles of necessity and purpose-specific <br/>use of personal data. They are explicitly prohibited from using TravelBuddyCore user <br/>data for secondary purposes (e.g., advertising, reselling, profiling) without user consent. <br/>14. Children&#8217;s Data and Age-Specific Protections&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>14.1 Age Restrictions <br/>a. The Platform is intended for individuals aged 18 and above.&#8203;<br/> b. We do not knowingly collect or process Personal Data from individuals under the age <br/>of: <br/></b></p>
<p><b>&#9679;&#8203; 13 under U.S. COPPA,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; 18 under Brazilian LGPD,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; 16 under GDPR without guardian consent,&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; 18 under Nepal&#8217;s Privacy Act and India&#8217;s DPDP Act unless express parental or <br/>guardian consent is obtained.&#8203;<br/> <br/></b></p>
<p><b>14.2 Parental Consent Requirements <br/>If it is discovered that a user under the applicable minimum age has submitted Personal <br/>Data, we will: <br/>a. Immediately suspend the account pending identity verification;&#8203;<br/> b. Notify the parent/guardian (if contactable);&#8203;<br/> c. Delete the Personal Data unless retention is legally required or explicitly consented to <br/>by the guardian. <br/>Where parental consent is required (e.g., travel bookings for minors), the following <br/>protocols apply: <br/></b></p>
<p><b>&#9679;&#8203; Consent is gathered through verifiable methods (e.g., digital signature, document <br/>upload);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The purpose and extent of data usage are clearly communicated to guardians;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Guardians may access, correct, or delete the child&#8217;s data at any time via our <br/>Privacy Dashboard.&#8203;<br/> <br/></b></p>
<p><b>14.3 Systems and Monitoring <br/>We deploy age-verification mechanisms during onboarding and use pattern-monitoring <br/>algorithms to detect potential underage accounts (e.g., language patterns, browsing <br/>behavior). <br/>14.4 Jurisdictional Compliance </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>TravelBuddyCore.INC complies with local and extraterritorial laws concerning child data. <br/>For Nepal-based users, all child-related data is handled in accordance with Sections 3, 9, <br/>and 23 of the Individual Privacy Act, 2018 and in coordination with the Child Welfare <br/>Board where applicable. <br/>15 Third-Party Integrations and Embedded Content&#8203;<br/> <br/>15.1 Overview <br/>The TravelBuddyCore.INC Platform (&#8220;Platform&#8221;) may include links to external websites, <br/>embed third-party content (such as maps, social widgets, or video streams), and offer <br/>integrations with third-party services (e.g., login via Google, Apple, or Facebook; booking <br/>APIs from airlines and hotel providers). These third-party services may independently <br/>collect, process, or store your Personal Data when you interact with their functionality. <br/>This Chapter outlines our responsibilities, your rights, and applicable safeguards relating <br/>to such third-party integrations, particularly where such data flows implicate Nepal&#8217;s <br/>Individual Privacy Act, 2018 (&#8220;IP Act&#8221;), as well as international regulations such as the <br/>GDPR and CCPA/CPRA. <br/>15.2 Nature of Integration <br/>We distinguish between two categories of third-party interactions: <br/>(a) Embedded Content (Indirect Integration):&#8203;<br/> Examples include YouTube videos, embedded Instagram posts, interactive maps, or <br/>payment iframes. In such cases, the third party may deploy cookies or tracking scripts <br/>directly within your browser without our direct control. These parties may act as <br/>independent data controllers under applicable law. <br/>(b) Functional Integrations (Direct Integration):&#8203;<br/> Examples include social logins, third-party travel booking engines, external calendar <br/>syncing, or loyalty program connections. These integrations may involve us sharing <br/>Personal Data with the third party or vice versa. In these instances, we generally act as a <br/>joint controller or ensure the third party is a processor acting under a written Data <br/>Processing Agreement. <br/>15.3 Disclosure of Data to Third Parties <br/>Where Personal Data is disclosed to third parties as part of an integration, we ensure the <br/>following conditions are met: <br/></b></p>
<p><b>&#9679;&#8203; There is a lawful basis for the disclosure (e.g., your consent under Article 4(1) of <br/>the IP Act; performance of contract under GDPR Article 6(1)(b));&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>&#9679;&#8203; You are clearly informed of the identity of the third party and the categories of <br/>data involved, via a just-in-time notice or integration-specific privacy prompt;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; The third party has agreed, where required, to limit the use of data solely for the <br/>stated purpose and not to repurpose or onward-share it;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We assess the data protection practices of the third party (including <br/>sub-processors or affiliates) prior to integration and at regular intervals thereafter.&#8203;<br/> <br/></b></p>
<p><b>15.4 Cookies, SDKs, and Device Identifiers <br/>Third-party scripts, SDKs, and iframes may place or read cookies and device identifiers <br/>on your system. This includes advertising networks, analytics tools, and embedded <br/>service widgets. <br/>In accordance with Nepalese consent requirements (Rule 4 of IP Regulation), we: <br/></b></p>
<p><b>&#9679;&#8203; Seek affirmative, informed consent before allowing third-party cookies that collect <br/>Personal or Sensitive Personal Data;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Allow users to manage cookie preferences via our Cookie Banner and in-Platform <br/>Privacy Settings;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Provide full transparency regarding third-party data recipients in our Cookie <br/>Notice.&#8203;<br/> <br/></b></p>
<p><b>15.5 Joint Controllers and Platform Access via Third Parties <br/>Where we and a third-party service (e.g., Google, Meta, airline APIs) jointly determine the <br/>purposes and means of processing, both parties may be considered &#8220;joint controllers&#8221; <br/>under international norms. In such cases: <br/></b></p>
<p><b>&#9679;&#8203; We allocate responsibilities for user notice, consent, and redress via a formal <br/>Joint Controller Agreement;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We ensure that at least one point of contact is available for exercising your data <br/>rights;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; You may exercise your rights against either party (us or the third party), and we <br/>will coordinate to ensure timely response.&#8203;<br/> <br/></b></p>
<p><b>15.6 Due Diligence and Processor Agreements </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>For all third-party service providers who process data on our behalf (including analytics, <br/>hosting, support ticketing, and content moderation vendors): <br/></b></p>
<p><b>&#9679;&#8203; We conduct legal and technical due diligence, including data localization, breach <br/>history, and subprocessor transparency;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We enter into Nepal IP Act&#8211;compliant data processing agreements (DPAs) with <br/>obligations regarding confidentiality, breach notification, subcontracting, and <br/>international transfer controls;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We monitor and audit compliance on a periodic basis and suspend integrations <br/>that do not meet baseline privacy standards.&#8203;<br/> <br/></b></p>
<p><b>15.7 User Responsibility and External Sites <br/>Where you voluntarily click links to third-party websites or apps (e.g., airline check-in <br/>systems, hotel partner sites), you will be subject to that third party&#8217;s own privacy policy <br/>and terms of use. We are not responsible for the data practices of such external services <br/>once you leave our controlled environment. <br/>We encourage you to review third-party privacy policies before providing any information <br/>directly to those services. <br/>15.8 Notification of Changes to Third-Party Relationships <br/>If a third-party integration is significantly modified (e.g., change of vendor, scope of data <br/>shared, or legal role), we will notify affected users via email and/or Platform notices and <br/>obtain fresh consent where legally required. <br/>16 Updates to This Privacy Policy&#8203;<br/> <br/>16.1 Policy Review Cycle and Authority <br/>TravelBuddyCore.INC (&#8220;we&#8221;, &#8220;us&#8221;, &#8220;our&#8221;) commits to regularly reviewing, updating, and <br/>improving this Privacy Policy in light of changes to: <br/></b></p>
<p><b>&#9679;&#8203; Applicable laws or regulations (including the Nepal Individual Privacy Act, 2018 <br/>and any amendments or new sector-specific regulations);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Our internal data practices, services, or platform features;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Industry standards or evolving best practices regarding data protection and user <br/>rights.&#8203;<br/> </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>We conduct a formal privacy policy audit at least once every twelve (12) calendar <br/>months. All amendments are approved by our designated Privacy Officer and, where <br/>applicable, external legal counsel specializing in Nepalese and international data <br/>protection law. <br/>16.2 Triggers for Interim Amendments <br/>In addition to our regular review cycle, we may revise this Policy at any time if: <br/></b></p>
<p><b>&#9679;&#8203; We introduce new features or services that materially affect how we collect, use, <br/>or disclose personal data;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; There is a significant reorganization of our business (e.g., merger, acquisition, or <br/>spin-off);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; We engage new third-party data processors or cross-border data transfers that <br/>affect your rights;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; New guidance is issued by the Privacy Commission of Nepal, European Data <br/>Protection Board (EDPB), or relevant regulators in our user base&#8217;s jurisdictions;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; There is a material change to how your personal data is protected, retained, or <br/>shared.&#8203;<br/> <br/></b></p>
<p><b>16.3 User Notification Procedures <br/>When we make material changes to this Privacy Policy, we will: <br/>(a) Provide advance notice to you through at least two of the following channels: <br/></b></p>
<p><b>&#9679;&#8203; Email notification to your registered email address;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; In-app banner or pop-up message upon login;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Notice posted to our official website homepage or Help Center.&#8203;<br/> <br/></b></p>
<p><b>(b) Describe the effective date of the revised Policy and highlight what has changed in <br/>clear language; <br/>(c) Obtain renewed consent if the change materially affects your rights or expands the <br/>lawful basis for processing personal or sensitive personal data (e.g., new purposes for <br/>processing, introduction of third-party integrations with broader access); </b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b>(d) Archive previous versions of the Privacy Policy for transparency and historical <br/>access, in accordance with Section 8(3) of the IP Act (which mandates user access to <br/>prior data-handling terms). <br/>16.4 Your Responsibility Upon Updates <br/>You are responsible for reviewing the most current version of this Privacy Policy, which <br/>will be made publicly available at www.travelbuddycore.com/privacy or directly through <br/>your account settings. <br/>Continued use of the Platform after the effective date of any updated Policy constitutes <br/>your acknowledgment and agreement to the revised terms&#8212;unless applicable law (e.g., <br/>GDPR Article 7 or IP Act Section 6) requires your affirmative consent to material <br/>changes. <br/> <br/>17 Contact &amp; Legal Notice Information <br/>If you have any questions, concerns, or requests relating to this Privacy Policy, your <br/>personal data, or your rights under applicable privacy laws, you may contact us using <br/>the details below. This single point of contact applies to all requests, including but not <br/>limited to: <br/></b></p>
<p><b>&#9679;&#8203; Exercising your data subject rights (access, correction, erasure, etc.);&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Filing a grievance or complaint;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Seeking clarification regarding data processing activities;&#8203;<br/> <br/></b></p>
<p><b>&#9679;&#8203; Issuing a legal notice or notice of dispute.&#8203;<br/> <br/></b></p>
<p><b>Data Protection Officer (DPO) &amp; Privacy Contact <br/>TravelBuddyCore.INC&#8203;<br/> Attention: Privacy Officer&#8203;<br/> Address: Gairapatan-5, Lakeside, Pokhara 33700, Gandaki Province, Nepal&#8203;<br/> Email: privacy@travelbuddycore.com&#8203;<br/> Telephone (For Local Support): +977-61-XXXXXXX (if applicable &#8211; otherwise we can omit)&#8203;<br/> Business Hours: Sunday to Friday, 10:00 a.m. &#8211; 5:00 p.m. (NPT) <br/>For legal notices and official correspondence: <br/>Legal Correspondence Address:&#8203;<br/> TravelBuddyCore.INC &#8211; Legal Department&#8203;</b></p>

</div></div>
<div style={{pageBreakBefore: "always", pageBreakAfter: "always"}}><div><p> <br/></p>
<p><b> c/o Privacy Officer&#8203;<br/> Gairapatan-5, Lakeside, Pokhara 33700&#8203;<br/> Nepal <br/>Please ensure that any legal notices are marked &#8220;Attention: Legal Department &#8211; Privacy <br/>Policy&#8221; in the subject line or envelope. We may require verification of your identity before <br/>processing sensitive or rights-related requests. <br/>  </b></p>

</div></div>


           </div>
        </div>
        </div>
    </div>
  );
};

export default TermsPage;