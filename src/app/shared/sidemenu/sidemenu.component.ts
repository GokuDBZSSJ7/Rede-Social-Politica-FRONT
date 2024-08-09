import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { CandidatesService } from '../../services/candidates.service';

const DASHBOARD_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M12 2.66669H5.33335C3.86059 2.66669 2.66669 3.86059 2.66669 5.33335V14.6667C2.66669 16.1394 3.86059 17.3334 5.33335 17.3334H12C13.4728 17.3334 14.6667 16.1394 14.6667 14.6667V5.33335C14.6667 3.86059 13.4728 2.66669 12 2.66669Z" fill="black"/>
<path d="M26.6666 2.66669H20C18.5272 2.66669 17.3333 3.86059 17.3333 5.33335V9.33335C17.3333 10.8061 18.5272 12 20 12H26.6666C28.1394 12 29.3333 10.8061 29.3333 9.33335V5.33335C29.3333 3.86059 28.1394 2.66669 26.6666 2.66669Z" fill="black"/>
<path d="M12 20H5.33335C3.86059 20 2.66669 21.1939 2.66669 22.6667V26.6667C2.66669 28.1394 3.86059 29.3333 5.33335 29.3333H12C13.4728 29.3333 14.6667 28.1394 14.6667 26.6667V22.6667C14.6667 21.1939 13.4728 20 12 20Z" fill="black"/>
<path d="M26.6666 14.6667H20C18.5272 14.6667 17.3333 15.8606 17.3333 17.3334V26.6667C17.3333 28.1394 18.5272 29.3334 20 29.3334H26.6666C28.1394 29.3334 29.3333 28.1394 29.3333 26.6667V17.3334C29.3333 15.8606 28.1394 14.6667 26.6666 14.6667Z" fill="black"/>
</svg>
`

const FEED_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 13.3333C4 8.30497 4 5.79083 5.56209 4.22872C7.1242 2.66663 9.63835 2.66663 14.6667 2.66663H17.3333C22.3616 2.66663 24.8759 2.66663 26.4379 4.22872C28 5.79083 28 8.30497 28 13.3333V18.6666C28 23.6949 28 26.2092 26.4379 27.7712C24.8759 29.3333 22.3616 29.3333 17.3333 29.3333H14.6667C9.63835 29.3333 7.1242 29.3333 5.56209 27.7712C4 26.2092 4 23.6949 4 18.6666V13.3333ZM8 16C8 14.1144 8 13.1715 8.58579 12.5857C9.17157 12 10.1144 12 12 12H20C21.8856 12 22.8284 12 23.4143 12.5857C24 13.1715 24 14.1144 24 16V21.3333C24 23.2189 24 24.1617 23.4143 24.7476C22.8284 25.3333 21.8856 25.3333 20 25.3333H12C10.1144 25.3333 9.17157 25.3333 8.58579 24.7476C8 24.1617 8 23.2189 8 21.3333V16ZM9.33333 6.99996C8.78105 6.99996 8.33333 7.44768 8.33333 7.99996C8.33333 8.55224 8.78105 8.99996 9.33333 8.99996H16C16.5523 8.99996 17 8.55224 17 7.99996C17 7.44768 16.5523 6.99996 16 6.99996H9.33333Z" fill="black"/>
</svg>
`


const CANDIDATE_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<g clip-path="url(#clip0_126_1527)">
<path d="M16.682 14.8248C20.7772 14.8248 24.0923 11.5046 24.0923 7.41188C24.0923 3.31792 20.7772 0 16.682 0C12.5885 0 9.27008 3.31817 9.27008 7.41188C9.27008 11.5048 12.5885 14.8248 16.682 14.8248Z" fill="black"/>
<path d="M18.5904 15.1235L16.7447 16.9827L14.9548 15.104C14.9487 15.1056 14.942 15.1056 14.9379 15.1071C14.6392 15.1788 13.3715 15.5822 11.7267 16.7618C11.7121 16.7721 11.3781 17.0037 11.2217 17.1017C10.9113 17.2978 10.4477 17.5817 9.88695 17.8496C9.32948 18.122 8.66912 18.3685 8.06815 18.4975C7.7715 18.5563 7.50351 18.5725 7.28826 18.5655C7.06583 18.5614 6.93786 18.5133 6.8022 18.4539C6.72926 18.4371 6.67525 18.3685 6.59539 18.3306C6.53294 18.2476 6.44259 18.208 6.37476 18.0902C6.33842 18.0383 6.2967 17.9948 6.25779 17.9385L6.15259 17.7437C6.0712 17.628 6.01975 17.4555 5.95398 17.307C5.88205 17.1642 5.84494 16.9763 5.79145 16.8118C5.73565 16.6487 5.69828 16.4698 5.66577 16.2904C5.58336 15.9454 5.54471 15.5852 5.50452 15.2545C5.45512 14.9284 5.45819 14.6011 5.43388 14.3249C5.43311 14.317 5.43362 14.3101 5.43311 14.3021C5.59001 14.0774 5.80322 13.8747 6.0625 13.6866C6.32152 13.5005 6.52526 13.1908 6.66041 12.8946C7.18613 11.7267 7.4147 11.0579 7.79197 9.83294C7.95118 9.31694 6.99954 8.74591 6.3786 10.2064C6.11599 10.7354 6.23066 10.7897 5.9637 11.3167L5.86823 11.4961C5.86823 11.4961 5.8132 10.9873 5.80603 10.8335C5.72336 9.06994 5.64786 8.12394 5.56314 6.36043C5.5401 5.8713 5.33636 5.65348 4.95883 5.67959C4.59947 5.70544 4.44155 5.92684 4.46075 6.40215C4.49939 7.36479 4.54547 7.50863 4.58437 8.4705C4.60254 8.83319 4.36656 8.76434 4.36809 8.46897C4.30564 7.15695 4.246 6.86721 4.19328 5.55494C4.17843 5.19866 4.03023 4.96497 3.66499 4.92581C3.31203 4.88844 3.07092 5.18151 3.08884 5.62763C3.14131 6.89588 3.20402 7.14159 3.25623 8.4101C3.27466 8.78532 3.04379 8.7262 3.04302 8.44414C2.99618 7.43876 2.96649 7.24961 2.8938 6.24601C2.87972 6.04381 2.75687 5.77813 2.59792 5.67217C2.21015 5.41391 1.78629 5.74307 1.80421 6.27852C1.84158 7.40139 1.90224 7.70597 1.94857 8.82781C1.97647 9.11576 1.75097 9.19306 1.73869 8.85776C1.70388 8.14339 1.677 8.24629 1.63784 7.53269C1.61993 7.20737 1.43462 7.02155 1.10751 7.00901C0.777072 6.99698 0.59509 7.1892 0.541339 7.49993C0.518304 7.62714 0.530589 7.76151 0.536476 7.89179C0.611727 9.58313 0.65703 10.4587 0.781935 12.1462C0.826471 12.7372 0.89737 13.1498 0.99412 13.6269C1.09087 14.104 1.35706 14.329 1.42079 14.5653C1.40595 14.8386 1.38803 15.1258 1.39878 15.4552C1.40467 15.8929 1.40723 16.3659 1.46789 16.8924C1.48888 17.1514 1.51652 17.4202 1.57437 17.7068C1.6294 17.992 1.66267 18.2748 1.75865 18.5842C1.84772 18.8906 1.91632 19.1954 2.06068 19.5225C2.12697 19.6838 2.19377 19.8461 2.26109 20.0089C2.34094 20.1734 2.43769 20.3398 2.53009 20.5052C2.69877 20.8369 2.96905 21.1645 3.21912 21.4849C3.51654 21.7903 3.816 22.1003 4.18764 22.3452C4.90124 22.8551 5.7528 23.197 6.53294 23.3265C7.31692 23.467 8.05125 23.4681 8.70803 23.4054C8.88438 23.3856 9.10015 23.3624 9.26908 23.3365L9.27394 32H24.6009V28.6826C24.939 29.6393 25.2577 30.7438 25.5595 32H31.4725C29.7241 23.8896 25.1481 17.2855 18.5904 15.1235ZM16.7616 31.6516H16.7288L14.9405 29.2055L16.7288 17.2581H16.7616L18.5512 29.2055L16.7616 31.6516Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_126_1527">
<rect width="32" height="32" fill="white"/>
</clipPath>
</defs>
</svg>
`

const CANDIDATE_SPEECH_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M15.8867 7.13419C17.8568 7.13419 19.4538 5.53715 19.4538 3.56709C19.4538 1.59704 17.8568 0 15.8867 0C13.9167 0 12.3196 1.59704 12.3196 3.56709C12.3196 5.53715 13.9167 7.13419 15.8867 7.13419Z" fill="black"/>
<path d="M17.2803 10.8324H18.17C18.4565 10.8324 18.7068 10.9967 18.8241 11.2467C20.5902 11.9257 21.0084 14.0882 21.0921 15.4445H23.0219C22.1818 11.5409 19.9799 8.36264 16.8241 7.32244L15.9352 8.21696L15.0739 7.31274C15.0705 7.31351 15.0682 7.31351 15.0649 7.31427C14.6241 7.4199 9.98716 9.47479 8.97809 15.4443H11.8226C11.9675 14.8398 12.1214 14.3094 12.2844 13.8484V15.4443H19.9496C19.9702 14.5556 19.6493 13.7101 19.5947 13.5736C19.6056 13.6029 19.1477 12.5255 18.4027 12.2418C18.3274 12.2683 18.2493 12.2813 18.17 12.2813H17.2803C16.881 12.2813 16.5555 11.9563 16.5555 11.5567C16.5557 11.1574 16.8805 10.8324 17.2803 10.8324ZM16.8042 14.0997L15.9436 15.2769H15.927L15.0672 14.0997L15.927 8.34937H15.9436L16.8042 14.0997Z" fill="black"/>
<path d="M24.4767 15.8221H7.52301V17.6686H24.4767V15.8221Z" fill="black"/>
<path d="M10.0913 31.9999H21.909L23.0816 18.0883H8.91864L10.0913 31.9999Z" fill="black"/>
</svg>
`

const FLAG_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M7.66669 1.33337C8.21897 1.33337 8.66669 1.78109 8.66669 2.33337V4.80004L10.9609 4.3412C13.1616 3.90105 15.4428 4.11049 17.5266 4.944L18.0776 5.16443C19.9775 5.92435 22.0684 6.06627 24.0535 5.56999C24.8948 5.35967 25.5704 6.27151 25.1243 7.01513L23.4196 9.85632C22.9643 10.6152 22.7366 10.9946 22.6826 11.4074C22.6602 11.5795 22.6602 11.7539 22.6826 11.9261C22.7366 12.3388 22.9643 12.7182 23.4196 13.4771L25.5004 16.9452C25.9148 17.6359 25.5443 18.5307 24.7628 18.726L24.6294 18.7594C22.2699 19.3492 19.7847 19.1806 17.5266 18.2774C15.4428 17.4438 13.1616 17.2344 10.9609 17.6746L8.66669 18.1334V29C8.66669 29.5523 8.21897 30 7.66669 30C7.11441 30 6.66669 29.5523 6.66669 29V2.33337C6.66669 1.78109 7.11441 1.33337 7.66669 1.33337Z" fill="black"/>
</svg>
`

const ROLE_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
<path d="M28 29H4C2.896 29 2 28.104 2 27V18H6V21H10V18H22V21H26V18H30V27C30 28.104 29.104 29 28 29ZM23 20V16H25V20H23ZM7 20V16H9V20H7ZM26 15H22V17H10V15H6V17H2V10C2 8.896 2.896 8 4 8H28C29.104 8 30 8.896 30 10V17H26V15ZM19 4.979H13V7H11V6.021H12V3H20.021V6H21V7H19V4.979Z" fill="black"/>
</svg>
`

const CHECK_CIRCLE_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#000000"><path d="M422-297.33 704.67-580l-49.34-48.67L422-395.33l-118-118-48.67 48.66L422-297.33ZM480-80q-82.33 0-155.33-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.67T80-480q0-83 31.5-156t85.83-127q54.34-54 127.34-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82.33-31.5 155.33-31.5 73-85.5 127.34Q709-143 636-111.5T480-80Z"/></svg>
`

const LOGOUT_ICON =
  `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#cb1a27"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
`

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {
  user: any = this.authService.getUser();
  candidate: any;
  menus: any[] = [{
    title: 'Módulos Gerais',
    contentMenus: [
      {
        label: 'Dashboard',
        icon: 'dashboard_icon',
        route: '/dashboard'
      },
      {
        label: 'Feed',
        icon: 'feed_icon',
        route: '/feed'
      },
      {
        label: 'Candidatos',
        icon: 'candidate_icon',
        route: '/candidates'
      },
      {
        label: 'Campanhas',
        icon: 'candidate_speech_icon',
        route: '/campaigns'
      },
      {
        label: 'Partidos',
        icon: 'flag_icon',
        route: '/'
      },
    ],
  },
  {
    title: 'Módulos Administrativos',
    contentMenus: [
      {
        label: 'Partido',
        icon: 'flag_icon',
        route: '/parties'
      },
      {
        label: 'Cargo',
        icon: 'role_icon',
        route: '/positions'
      },
      {
        label: 'Campanha',
        icon: 'candidate_speech_icon',
        route: '/'
      },
      {
        label: 'Aprovar Candidato',
        icon: 'check_circle_icon',
        route: '/approve-candidates'
      },
      {
        label: 'Área do Candidato',
        icon: 'candidate_icon',
        route: '/'
      }
    ]
  },
  ];
  userMenu: any[] = [
    {
      label: 'Meu Perfil',
      icon: 'account_circle',
      route: '/my-user'
    },
    {
      label: 'Sair',
      icon: 'logout_icon',
      route: '/',
      classPanel: 'logout-btn',
      handler: () => {
        console.log('Logout handler called');
        this.logout();
      }
    }
  ];

  constructor(
    private authService: AuthService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private candidateService: CandidatesService
  ) {
    iconRegistry.addSvgIconLiteral('dashboard_icon', sanitizer.bypassSecurityTrustHtml(DASHBOARD_ICON));
    iconRegistry.addSvgIconLiteral('feed_icon', sanitizer.bypassSecurityTrustHtml(FEED_ICON));
    iconRegistry.addSvgIconLiteral('candidate_icon', sanitizer.bypassSecurityTrustHtml(CANDIDATE_ICON));
    iconRegistry.addSvgIconLiteral('candidate_speech_icon', sanitizer.bypassSecurityTrustHtml(CANDIDATE_SPEECH_ICON));
    iconRegistry.addSvgIconLiteral('flag_icon', sanitizer.bypassSecurityTrustHtml(FLAG_ICON));
    iconRegistry.addSvgIconLiteral('role_icon', sanitizer.bypassSecurityTrustHtml(ROLE_ICON));
    iconRegistry.addSvgIconLiteral('check_circle_icon', sanitizer.bypassSecurityTrustHtml(CHECK_CIRCLE_ICON));
    iconRegistry.addSvgIconLiteral('logout_icon', sanitizer.bypassSecurityTrustHtml(LOGOUT_ICON));
  }

  ngOnInit(): void {
    this.getCandidate();
    console.log(this.user)
  }
  
  logout() {
    this.authService.logout();
  }
  
  getCandidate() {
    this.candidateService.getCandidateByUserId(this.user.id).subscribe({
      next: (res) => {
        this.candidate = res
        console.log(this.candidate)
      }
    })
  }
}