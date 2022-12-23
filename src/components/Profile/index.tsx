import styles from './Profile.module.css';

interface IProfileProps {
  name?: string;
  profileType?: 'doctor' | 'user';
}

const Profile = ({ name, profileType }: IProfileProps) => {
  return (
    <div className={styles.profileContainer}>
      {profileType === 'user' ? (
        <>
          <div>
            <strong>{name ? name : 'Usuário padrão'}</strong>
          </div>
          <img src="user-default.png" alt="Usuário padrão" />
        </>
      ) : (
        <>
          <img src="user-default.png" alt="Usuário padrão" />
          <div className={styles.infoDoctor}>
            <strong>{name ? name : ' Doutor padrão'}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
