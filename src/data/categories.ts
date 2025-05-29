import { Category } from '../types';
import { Shield, Terminal, Database, Code, Globe } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'crypto',
    name: 'Cryptography',
    description: 'Master the art of encrypting and decrypting information.',
    icon: 'Shield',
    color: 'cyber-blue',
    isLocked: false,
    challenges: [
      {
        id: 'crypto-1',
        categoryId: 'crypto',
        title: 'Caesar Cipher',
        description: 'Decode a message encrypted with a Caesar cipher. The key is the number of positions each letter is shifted.',
        difficulty: 1,
        points: 50,
        hints: [
          {
            id: 'crypto-1-hint-1',
            text: 'The Caesar cipher shifts each letter by a fixed number of positions in the alphabet.',
            cost: 10,
            isRevealed: false,
          },
          {
            id: 'crypto-1-hint-2',
            text: 'Try shifting the letters back by 3 positions.',
            cost: 20,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{HAIL_CAESAR}',
        isCompleted: false,
        isLocked: false,
      },
      {
        id: 'crypto-2',
        categoryId: 'crypto',
        title: 'RSA Encryption',
        description: 'Decrypt a message encoded with RSA. You are given the private key and the ciphertext.',
        difficulty: 2,
        points: 100,
        hints: [
          {
            id: 'crypto-2-hint-1',
            text: 'Remember the formula: m = c^d mod n',
            cost: 15,
            isRevealed: false,
          },
          {
            id: 'crypto-2-hint-2',
            text: 'The values of d and n are provided in the challenge.',
            cost: 25,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{RSA_MASTER}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'crypto-3',
        categoryId: 'crypto',
        title: 'Hash Functions',
        description: 'Find the original message that produces this SHA-256 hash.',
        difficulty: 3,
        points: 150,
        hints: [
          {
            id: 'crypto-3-hint-1',
            text: 'Try a dictionary attack with common passwords.',
            cost: 20,
            isRevealed: false,
          },
          {
            id: 'crypto-3-hint-2',
            text: 'The original message is a single English word, all lowercase.',
            cost: 30,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{HASH_CRACKED}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'crypto-4',
        categoryId: 'crypto',
        title: 'Digital Signatures',
        description: 'Verify if a digital signature is valid using the provided public key.',
        difficulty: 4,
        points: 200,
        hints: [
          {
            id: 'crypto-4-hint-1',
            text: 'Use the public key to verify the signature of the message.',
            cost: 25,
            isRevealed: false,
          },
          {
            id: 'crypto-4-hint-2',
            text: 'Check if the signature has been tampered with.',
            cost: 35,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{SIGNATURE_VALID}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'crypto-5',
        categoryId: 'crypto',
        title: 'Cryptanalysis',
        description: 'Break the Vigenère cipher without knowing the key.',
        difficulty: 5,
        points: 250,
        hints: [
          {
            id: 'crypto-5-hint-1',
            text: 'The key length is between 3 and 5 characters.',
            cost: 30,
            isRevealed: false,
          },
          {
            id: 'crypto-5-hint-2',
            text: 'Use frequency analysis to determine the key.',
            cost: 40,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{VIGENERE_BROKEN}',
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'privesc',
    name: 'Privilege Escalation',
    description: 'Learn to escalate your privileges from a standard user to administrator.',
    icon: 'Terminal',
    color: 'cyber-red',
    isLocked: true,
    challenges: [
      {
        id: 'privesc-1',
        categoryId: 'privesc',
        title: 'SUID Binary Exploitation',
        description: 'Exploit a SUID binary to gain root privileges on a Linux system.',
        difficulty: 1,
        points: 50,
        hints: [
          {
            id: 'privesc-1-hint-1',
            text: 'Look for SUID binaries using the find command.',
            cost: 10,
            isRevealed: false,
          },
          {
            id: 'privesc-1-hint-2',
            text: 'The binary has a command injection vulnerability.',
            cost: 20,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{SUID_PWNED}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'privesc-2',
        categoryId: 'privesc',
        title: 'Kernel Exploitation',
        description: 'Exploit a vulnerability in the kernel to escalate privileges.',
        difficulty: 2,
        points: 100,
        hints: [
          {
            id: 'privesc-2-hint-1',
            text: 'Check the kernel version for known vulnerabilities.',
            cost: 15,
            isRevealed: false,
          },
          {
            id: 'privesc-2-hint-2',
            text: 'The system is vulnerable to DirtyCow (CVE-2016-5195).',
            cost: 25,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{KERNEL_OWNED}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'privesc-3',
        categoryId: 'privesc',
        title: 'File Permission Exploitation',
        description: 'Leverage weak file permissions to escalate privileges.',
        difficulty: 3,
        points: 150,
        hints: [
          {
            id: 'privesc-3-hint-1',
            text: 'Check for world-writable files in sensitive locations.',
            cost: 20,
            isRevealed: false,
          },
          {
            id: 'privesc-3-hint-2',
            text: 'Look for misconfigured cron jobs.',
            cost: 30,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{BAD_PERMISSIONS}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'privesc-4',
        categoryId: 'privesc',
        title: 'Network Exploitation',
        description: 'Exploit network services to gain higher privileges.',
        difficulty: 4,
        points: 200,
        hints: [
          {
            id: 'privesc-4-hint-1',
            text: 'Scan for internal services with nmap.',
            cost: 25,
            isRevealed: false,
          },
          {
            id: 'privesc-4-hint-2',
            text: 'The internal SMTP server has a known vulnerability.',
            cost: 35,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{NETWORK_PWNED}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'privesc-5',
        categoryId: 'privesc',
        title: 'Social Engineering',
        description: 'Use social engineering techniques to gain administrator credentials.',
        difficulty: 5,
        points: 250,
        hints: [
          {
            id: 'privesc-5-hint-1',
            text: 'Look for personal information that could be used in a phishing attack.',
            cost: 30,
            isRevealed: false,
          },
          {
            id: 'privesc-5-hint-2',
            text: 'Creating a convincing email template is key.',
            cost: 40,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{SOCIAL_MASTER}',
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'sqli',
    name: 'SQL Injection',
    description: 'Learn to exploit SQL injection vulnerabilities to extract sensitive data.',
    icon: 'Database',
    color: 'cyber-green',
    isLocked: true,
    challenges: [
      {
        id: 'sqli-1',
        categoryId: 'sqli',
        title: 'Basic SQL Injection',
        description: 'Exploit a basic SQL injection vulnerability to bypass authentication.',
        difficulty: 1,
        points: 50,
        hints: [
          {
            id: 'sqli-1-hint-1',
            text: 'Try using single quotes in the input fields.',
            cost: 10,
            isRevealed: false,
          },
          {
            id: 'sqli-1-hint-2',
            text: 'The classic \'" OR \'1\'=\'1\' might work here.',
            cost: 20,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{SQL_BASICS}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'sqli-2',
        categoryId: 'sqli',
        title: 'Blind SQL Injection',
        description: 'Extract data using a blind SQL injection vulnerability.',
        difficulty: 2,
        points: 100,
        hints: [
          {
            id: 'sqli-2-hint-1',
            text: 'Use boolean-based techniques to extract data one bit at a time.',
            cost: 15,
            isRevealed: false,
          },
          {
            id: 'sqli-2-hint-2',
            text: 'Try using the SUBSTRING function to extract characters.',
            cost: 25,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{BLIND_MASTER}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'sqli-3',
        categoryId: 'sqli',
        title: 'Time-Based SQL Injection',
        description: 'Extract data using time delays in SQL queries.',
        difficulty: 3,
        points: 150,
        hints: [
          {
            id: 'sqli-3-hint-1',
            text: 'Use the SLEEP() function in MySQL or equivalent in other databases.',
            cost: 20,
            isRevealed: false,
          },
          {
            id: 'sqli-3-hint-2',
            text: 'The response time indicates whether your condition is true or false.',
            cost: 30,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{TIME_HACKER}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'sqli-4',
        categoryId: 'sqli',
        title: 'Boolean-Based SQL Injection',
        description: 'Extract data using boolean conditions in SQL queries.',
        difficulty: 4,
        points: 200,
        hints: [
          {
            id: 'sqli-4-hint-1',
            text: 'Use AND/OR operators to construct boolean conditions.',
            cost: 25,
            isRevealed: false,
          },
          {
            id: 'sqli-4-hint-2',
            text: 'The page behaves differently based on the truth of your condition.',
            cost: 35,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{BOOLEAN_NINJA}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'sqli-5',
        categoryId: 'sqli',
        title: 'Advanced SQL Injection',
        description: 'Combine multiple techniques to bypass WAF and extract sensitive data.',
        difficulty: 5,
        points: 250,
        hints: [
          {
            id: 'sqli-5-hint-1',
            text: 'The WAF blocks common SQL injection patterns.',
            cost: 30,
            isRevealed: false,
          },
          {
            id: 'sqli-5-hint-2',
            text: 'Try using encoding and alternate syntax to bypass filters.',
            cost: 40,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{WAF_BYPASSED}',
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'xss',
    name: 'Cross-Site Scripting',
    description: 'Understand how to find and exploit XSS vulnerabilities in web applications.',
    icon: 'Code',
    color: 'cyber-pink',
    isLocked: true,
    challenges: [
      {
        id: 'xss-1',
        categoryId: 'xss',
        title: 'Reflected XSS',
        description: 'Exploit a reflected XSS vulnerability to steal cookies.',
        difficulty: 1,
        points: 50,
        hints: [
          {
            id: 'xss-1-hint-1',
            text: 'Try injecting JavaScript in URL parameters.',
            cost: 10,
            isRevealed: false,
          },
          {
            id: 'xss-1-hint-2',
            text: 'Use alert() to test if XSS is possible.',
            cost: 20,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{REFLECTED_XSS}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'xss-2',
        categoryId: 'xss',
        title: 'Stored XSS',
        description: 'Exploit a stored XSS vulnerability in a comment system.',
        difficulty: 2,
        points: 100,
        hints: [
          {
            id: 'xss-2-hint-1',
            text: 'The comment form does not properly sanitize input.',
            cost: 15,
            isRevealed: false,
          },
          {
            id: 'xss-2-hint-2',
            text: 'Your payload will be executed whenever someone views the comments.',
            cost: 25,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{STORED_XSS_MASTER}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'xss-3',
        categoryId: 'xss',
        title: 'DOM-Based XSS',
        description: 'Exploit a DOM-based XSS vulnerability.',
        difficulty: 3,
        points: 150,
        hints: [
          {
            id: 'xss-3-hint-1',
            text: 'Look for JavaScript that uses document.location without proper sanitization.',
            cost: 20,
            isRevealed: false,
          },
          {
            id: 'xss-3-hint-2',
            text: 'The vulnerability is in the client-side JavaScript, not server responses.',
            cost: 30,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{DOM_XSS_PRO}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'xss-4',
        categoryId: 'xss',
        title: 'XSS Filter Evasion',
        description: 'Bypass XSS filters to execute your JavaScript payload.',
        difficulty: 4,
        points: 200,
        hints: [
          {
            id: 'xss-4-hint-1',
            text: 'The application filters out <script> tags and common XSS patterns.',
            cost: 25,
            isRevealed: false,
          },
          {
            id: 'xss-4-hint-2',
            text: 'Try using event handlers like onerror or different encoding techniques.',
            cost: 35,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{FILTER_BYPASSED}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'xss-5',
        categoryId: 'xss',
        title: 'Advanced XSS',
        description: 'Chain multiple vulnerabilities to perform a sophisticated XSS attack.',
        difficulty: 5,
        points: 250,
        hints: [
          {
            id: 'xss-5-hint-1',
            text: 'You need to combine CSRF and XSS to succeed.',
            cost: 30,
            isRevealed: false,
          },
          {
            id: 'xss-5-hint-2',
            text: 'The Content Security Policy restricts where scripts can be loaded from.',
            cost: 40,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{XSS_NINJA}',
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
  {
    id: 'webexploit',
    name: 'Web Exploitation',
    description: 'Explore common web application vulnerabilities and how to exploit them.',
    icon: 'Globe',
    color: 'cyber-yellow',
    isLocked: true,
    challenges: [
      {
        id: 'webexploit-1',
        categoryId: 'webexploit',
        title: 'File Inclusion',
        description: 'Exploit a local file inclusion vulnerability to read sensitive files.',
        difficulty: 1,
        points: 50,
        hints: [
          {
            id: 'webexploit-1-hint-1',
            text: 'Try manipulating the file parameter in the URL.',
            cost: 10,
            isRevealed: false,
          },
          {
            id: 'webexploit-1-hint-2',
            text: 'Use path traversal with "../" to access files outside the web root.',
            cost: 20,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{LFI_MASTER}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'webexploit-2',
        categoryId: 'webexploit',
        title: 'File Upload',
        description: 'Bypass file upload restrictions to upload and execute a web shell.',
        difficulty: 2,
        points: 100,
        hints: [
          {
            id: 'webexploit-2-hint-1',
            text: 'The application checks file extensions but not content.',
            cost: 15,
            isRevealed: false,
          },
          {
            id: 'webexploit-2-hint-2',
            text: 'Try changing the Content-Type header in your request.',
            cost: 25,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{UPLOAD_BYPASSED}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'webexploit-3',
        categoryId: 'webexploit',
        title: 'Clickjacking',
        description: 'Create a clickjacking attack to trick users into clicking hidden buttons.',
        difficulty: 3,
        points: 150,
        hints: [
          {
            id: 'webexploit-3-hint-1',
            text: 'Use transparent iframes to overlay the target website.',
            cost: 20,
            isRevealed: false,
          },
          {
            id: 'webexploit-3-hint-2',
            text: 'Position your decoy content to align with the target button.',
            cost: 30,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{CLICK_JACKED}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'webexploit-4',
        categoryId: 'webexploit',
        title: 'CSRF',
        description: 'Execute a Cross-Site Request Forgery attack to change a user\'s settings.',
        difficulty: 4,
        points: 200,
        hints: [
          {
            id: 'webexploit-4-hint-1',
            text: 'The application does not implement CSRF tokens.',
            cost: 25,
            isRevealed: false,
          },
          {
            id: 'webexploit-4-hint-2',
            text: 'Create a form that automatically submits to the target site.',
            cost: 35,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{CSRF_EXPLOITED}',
        isCompleted: false,
        isLocked: true,
      },
      {
        id: 'webexploit-5',
        categoryId: 'webexploit',
        title: 'Advanced Web Exploitation',
        description: 'Chain multiple vulnerabilities to perform a sophisticated attack.',
        difficulty: 5,
        points: 250,
        hints: [
          {
            id: 'webexploit-5-hint-1',
            text: 'You need to combine SSRF and command injection.',
            cost: 30,
            isRevealed: false,
          },
          {
            id: 'webexploit-5-hint-2',
            text: 'The internal service is vulnerable to XXE injection.',
            cost: 40,
            isRevealed: false,
          }
        ],
        flag: 'FLAG{WEB_NINJA}',
        isCompleted: false,
        isLocked: true,
      },
    ],
  },
];